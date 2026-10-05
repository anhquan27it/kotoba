"""Generate static MP3 assets once; end users need only a web browser."""

import asyncio
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
local_dependencies = ROOT / ".tmp_pip" / "tts"
if local_dependencies.is_dir():
    sys.path.insert(0, str(local_dependencies))
try:
    import edge_tts
    from mutagen import MutagenError
    from mutagen.mp3 import MP3
except ImportError:
    raise SystemExit(
        "Audio generation needs Python packages: "
        "python -m pip install --target .tmp_pip/tts edge-tts==7.2.8 mutagen==1.48.1"
    )


async def main():
    plan = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    output = (ROOT / "public" / "audio" / "pronunciation").resolve()
    output.mkdir(parents=True, exist_ok=True)
    limit = asyncio.Semaphore(3)
    completed = 0
    clips = {}

    def inspect(target):
        info = MP3(target).info
        if not 0.25 <= info.length <= 10 or info.sample_rate != 24000:
            raise ValueError(f"Unexpected MP3 audio: {target.name}")
        data = target.read_bytes()
        return {
            "durationMs": round(info.length * 1000),
            "bytes": len(data),
            "sha256": hashlib.sha256(data).hexdigest(),
        }

    async def generate(entry):
        nonlocal completed
        if not re.fullmatch(r"[a-f0-9]{24}\.mp3", entry["file"]):
            raise ValueError("Invalid audio asset filename")
        target = (output / entry["file"]).resolve()
        temporary = target.with_suffix(".mp3.tmp")
        if target.parent != output or temporary.parent != output:
            raise ValueError("Audio path must stay inside the output directory")
        async with limit:
            try:
                details = inspect(target)
            except (OSError, ValueError, MutagenError):
                for attempt in range(3):
                    try:
                        communicate = edge_tts.Communicate(
                            entry["reading"], plan["voice"], rate=plan["rate"]
                        )
                        await asyncio.wait_for(communicate.save(str(temporary)), 30)
                        details = inspect(temporary)
                        temporary.replace(target)
                        break
                    except Exception:
                        if attempt == 2:
                            raise
                        await asyncio.sleep(2 ** attempt)
            clips[entry["key"]] = {
                "text": entry["text"],
                "reading": entry["reading"],
                "file": entry["file"],
                **details,
            }
            completed += 1
            if completed % 10 == 0 or completed == len(plan["entries"]):
                print(f"Audio ready: {completed}/{len(plan['entries'])}", flush=True)

    await asyncio.gather(*(generate(entry) for entry in plan["entries"]))
    manifest = {
        "version": 1,
        "source": "Microsoft Edge online text-to-speech; synthesized audio, not textbook recordings",
        "voice": plan["voice"],
        "rate": plan["rate"],
        "format": "audio-24khz-48kbitrate-mono-mp3",
        "generator": f"edge-tts {edge_tts.__version__}",
        "clips": dict(sorted(clips.items())),
    }
    manifest_path = ROOT / "data" / "pronunciation-audio.json"
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    total_bytes = sum(clip["bytes"] for clip in clips.values())
    print(f"Saved {len(clips)} MP3 clips, {total_bytes / 1024 / 1024:.2f} MiB.")


if __name__ == "__main__":
    asyncio.run(main())
