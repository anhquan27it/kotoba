import { GrammarPattern } from "@/lib/types";

// Ngữ pháp Chương 15 — giáo trình Dũng Mori (N4)
export const grammar: GrammarPattern[] = [
  {
    id: "g-15-01",
    pattern: "～でしょう / ～だろう (phán đoán)",
    meaning: "Chắc hẳn ～",
    chapter: "15A",
    explanation:
      "Dùng khi đưa ra phán đoán, dự đoán và người nói tin rằng tỉ lệ xảy ra sự việc đó là khá cao. 「～だろう」 là thể thường của 「でしょう」.",
    usage: [
      "Thường đi với các phó từ như 「多分」「きっと」…",
      "Trong văn nói, sau 「でしょう / だろう」 thường thêm vĩ tố 「ね」「な」…",
      "Có thể thêm 「から」 vào sau 「だろう」 để nêu nguyên nhân mà người nói dự đoán.",
      "「～でしょう / ～だろう」 thường KHÔNG dùng để nói về hành động có ý chí của bản thân trong tương lai.",
    ],
    examples: [
      {
        jp: "たくさん勉強したから、きっと合格するだろうなあ。",
        vi: "Vì đã học rất nhiều nên chắc chắn sẽ đỗ.",
      },
      {
        jp: "忙しいだろうから、無理して参加しなくてもいいですよ。",
        vi: "Vì chắc anh bận nên không cần cố tham gia đâu ạ.",
      },
      {
        jp: "明日は今日より気温が下がるでしょう。",
        vi: "Ngày mai nhiệt độ chắc sẽ giảm so với hôm nay.",
      },
      {
        jp: "台風が来るから、学校は休みだろうね。",
        vi: "Vì bão đến nên trường chắc sẽ nghỉ nhỉ.",
      },
    ],
  },
  {
    id: "g-15-02",
    pattern: "～でしょう / ～だろう (xác nhận)",
    meaning: "～ phải không? / ～ đúng không?",
    chapter: "15A",
    explanation:
      "Dùng để đưa ra ý kiến bản thân nhằm xác nhận, hoặc kêu gọi / mong muốn sự đồng tình từ người nghe về một vấn đề nào đó. Thường lên giọng ở cuối câu.",
    usage: [
      "Có trường hợp người nói không lên giọng, cần dựa vào bối cảnh hội thoại để phán đoán nghĩa.",
    ],
    examples: [
      {
        jp: "このかばん、かわいいでしょう？",
        vi: "Chiếc cặp này dễ thương đúng không?",
      },
      {
        jp: "明日の飲み会、しょうたくんも行くでしょう？",
        vi: "Buổi nhậu ngày mai, Shota cũng đi đúng không?",
      },
      {
        jp: "田中さんは大阪の人だから、関西弁が話せるでしょう？",
        vi: "Anh Tanaka là người Osaka nên nói được tiếng địa phương Kansai đúng không?",
      },
    ],
  },
  {
    id: "g-15-03",
    pattern: "～かもしれない",
    meaning: "Có lẽ ～ / Có khi ～ / không chừng ～",
    chapter: "15B",
    explanation:
      "Dùng để diễn tả phán đoán của người nói về một khả năng nào đó. Mức độ chắc chắn cao hay thấp đều có thể dùng mẫu câu này. Thường dùng trong văn nói.",
    usage: [
      "Kết hợp: Động từ thể thường / Tính từ / Danh từ / Aな + かもしれない.",
    ],
    examples: [
      {
        jp: "忙しいから、飲み会に行けないかもしれません。",
        vi: "Vì bận nên có lẽ tôi không đi nhậu được.",
      },
      {
        jp: "このケーキ、はじめて作ったから、おいしくないかもしれない。",
        vi: "Vì lần đầu làm bánh này nên có khi không ngon.",
      },
      {
        jp: "もしかしたら、あの人はベトナム人かもしれませんね。",
        vi: "Biết đâu người đó là người Việt Nam.",
      },
      {
        jp: "風邪を引いたから、明日仕事を休むかもしれません。",
        vi: "Vì bị cảm nên có lẽ ngày mai tôi nghỉ làm.",
      },
    ],
  },
  {
    id: "g-15-04",
    pattern: "～みたいだ",
    meaning: "Hình như ～ / Có vẻ ～",
    chapter: "15B",
    explanation:
      "Dùng để đưa ra phán đoán dựa trên điều bản thân nhìn thấy, nghe thấy, cảm nhận thấy. Thường dùng trong văn nói.",
    usage: [
      "Kết hợp: Động từ thể thường / Tính từ / Danh từ / Aな + みたいだ.",
    ],
    examples: [
      {
        jp: "この店の前に人がたくさん並んでいますね。…人気があるみたいですね。",
        vi: "Trước cửa hàng này nhiều người xếp hàng nhỉ. …Có vẻ nổi tiếng nhỉ.",
      },
      {
        jp: "しょうた：今日はミンくん、いないね。　鈴木：うん。休みみたいだね。",
        vi: "Shota: Hôm nay Min không có mặt nhỉ.　Suzuki: Ừ, hình như cậu ấy nghỉ.",
      },
      {
        jp: "駅に人がたくさんいますね。…電車が遅れているみたいですね。",
        vi: "Ở ga nhiều người nhỉ. …Hình như tàu đang bị trễ.",
      },
      {
        jp: "あのアパート、いつも部屋が暗いよね。…誰も住んでいないみたいだね。",
        vi: "Căn hộ đó lúc nào cũng tối nhỉ. …Hình như không có ai ở.",
      },
    ],
  },
  {
    id: "g-15-05",
    pattern: "～ようだ",
    meaning: "Hình như ～ / Có vẻ ～",
    chapter: "15B",
    explanation:
      "Cách nói lịch sự, trang trọng của 「～みたいだ」. Thường dùng trên truyền hình, trong báo cáo, văn viết…",
    usage: [
      "Kết hợp: Động từ thể thường / N の / Aな + ようだ (khác 「みたいだ」, danh từ và Aな đi với 「の」/「な」).",
    ],
    examples: [
      {
        jp: "昨日、この交差点で事故がありました。木が倒れています。車がここにぶつかったようです。",
        vi: "Hôm qua, ở ngã tư này đã có tai nạn. Cây bị đổ. Hình như xe đã đâm vào đây.",
      },
      {
        jp: "部屋の中は真っ暗だ。誰もいないようだ。",
        vi: "Trong phòng tối om. Hình như không có ai.",
      },
      {
        jp: "その店に行きましたが、入り口が閉まっていました。休みのようでした。",
        vi: "Tôi đã đến cửa hàng đó nhưng lối vào đã đóng. Hình như là ngày nghỉ.",
      },
      {
        jp: "バスの時間は1日に5本しかなかった。この町はだいぶ不便なようだ。",
        vi: "Xe buýt chỉ có 5 chuyến một ngày. Thị trấn này có vẻ khá bất tiện.",
      },
    ],
  },
  {
    id: "g-15-06",
    pattern: "～はずだ",
    meaning: "Chắc chắn ～",
    chapter: "15B",
    explanation:
      "Dùng khi người nói đưa ra phán đoán khách quan dựa trên bối cảnh, tình huống; hoặc khi đưa ra điều mà người nói tin chắc dựa vào chứng cứ nào đó.",
    usage: [
      "Kết hợp: Động từ thể thường / Tính từ / N の / Aな + はずだ.",
      "「～はずだけど」: dùng khi tình trạng hiện tại có vẻ khác với suy nghĩ của người nói.",
    ],
    examples: [
      {
        jp: "あまり使わなかったから、きれいなはずです。",
        vi: "Vì không dùng nhiều nên chắc chắn nó còn đẹp.",
      },
      {
        jp: "駅で待っているはずだよ。さっきメールがあったから。",
        vi: "Chắc chắn cậu ấy đang đợi ở ga. Vì vừa có tin nhắn.",
      },
      {
        jp: "このレストランは有名だから、おいしいはずです。",
        vi: "Nhà hàng này nổi tiếng nên chắc chắn ngon.",
      },
      {
        jp: "おかしいなぁ…。さっきここに置いたはずだけど…。めがねがない。",
        vi: "Lạ thật… rõ ràng vừa đặt ở đây… nhưng kính không thấy đâu.",
      },
    ],
  },
];

// Bảng tổng hợp Thể thường (thể ngắn) — tham khảo
export const plainFormTables = [
  {
    title: "Thể thường của câu Danh từ và Tính từ đuôi な",
    rows: [
      { tense: "Hiện tại / Tương lai", type: "Khẳng định", polite: "N/Aなです", plain: "N/Aなだ" },
      { tense: "Hiện tại / Tương lai", type: "Phủ định", polite: "N/Aなじゃないです / じゃありません", plain: "N/Aなじゃない" },
      { tense: "Hiện tại / Tương lai", type: "Nghi vấn", polite: "N/Aなですか", plain: "N/Aな？" },
      { tense: "Quá khứ", type: "Khẳng định", polite: "N/Aなでした", plain: "N/Aなだった" },
      { tense: "Quá khứ", type: "Phủ định", polite: "N/Aなじゃなかったです / じゃありませんでした", plain: "N/Aなじゃなかった" },
      { tense: "Quá khứ", type: "Nghi vấn", polite: "N/Aなでしたか", plain: "N/Aなだった？" },
    ],
  },
  {
    title: "Thể thường của Tính từ đuôi い",
    rows: [
      { tense: "Hiện tại / Tương lai", type: "Khẳng định", polite: "Aいです", plain: "Aい" },
      { tense: "Hiện tại / Tương lai", type: "Phủ định", polite: "Aいくないです", plain: "Aいくない" },
      { tense: "Hiện tại / Tương lai", type: "Nghi vấn", polite: "Aいですか", plain: "Aい？" },
      { tense: "Quá khứ", type: "Khẳng định", polite: "Aいかったです", plain: "Aいかった" },
      { tense: "Quá khứ", type: "Phủ định", polite: "Aいくなかったです", plain: "Aいくなかった" },
      { tense: "Quá khứ", type: "Nghi vấn", polite: "Aいかったですか", plain: "Aいかった？" },
    ],
  },
  {
    title: "Thể thường của Động từ",
    rows: [
      { tense: "Hiện tại / Tương lai", type: "Khẳng định", polite: "V ます", plain: "V る" },
      { tense: "Hiện tại / Tương lai", type: "Phủ định", polite: "V ません", plain: "V ない" },
      { tense: "Hiện tại / Tương lai", type: "Nghi vấn", polite: "V ませんか", plain: "V ない？" },
      { tense: "Quá khứ", type: "Khẳng định", polite: "V ました", plain: "V た" },
      { tense: "Quá khứ", type: "Phủ định", polite: "V ませんでした", plain: "V なかった" },
      { tense: "Quá khứ", type: "Nghi vấn", polite: "V ませんでしたか", plain: "V なかった？" },
    ],
  },
];

export const grammarChapters = ["15A", "15B"];
