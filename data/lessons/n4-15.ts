import type { GrammarPattern, Lesson } from "@/lib/types";
import { vocabulary } from "@/data/vocabulary";
import { kanji } from "@/data/kanji";
import { grammar, plainFormTables } from "@/data/grammar";
import { questions } from "@/data/questions";

const guide: Record<string, Partial<GrammarPattern>> = {
  "g-15-01": {
    meaning: "Có lẽ / chắc là… (dự đoán)",
    situations: [
      "Đưa ra dự đoán về thời tiết, kết quả hoặc tình huống tương lai.",
    ],
    connections: [
      {
        type: "Động từ",
        form: "Thể thường + でしょう",
        example: "雨が降るでしょう。",
      },
      {
        type: "Tính từ い",
        form: "Thể thường + でしょう",
        example: "明日は寒いでしょう。",
      },
      {
        type: "Tính từ な",
        form: "Bỏ だ + でしょう",
        example: "この町は静かでしょう。",
      },
      {
        type: "Danh từ",
        form: "Bỏ だ + でしょう",
        example: "明日は休みでしょう。",
      },
    ],
    contrasts: [
      "でしょう / だろう: người nói đưa ra dự đoán. かもしれない: nêu một khả năng, giữ thái độ chưa khẳng định.",
      "Đổi sang だろう khi dùng thể thường; chọn cách nói phù hợp với người nghe.",
    ],
    mistakes: [
      {
        wrong: "明日は休みだでしょう。",
        correct: "明日は休みでしょう。",
        reason: "Bỏ だ sau danh từ trước でしょう.",
      },
    ],
  },
  "g-15-02": {
    situations: [
      "Muốn người nghe xác nhận hoặc đồng tình với điều mình nói. Bối cảnh và ngữ điệu quyết định cách hiểu.",
    ],
    connections: [
      {
        type: "Động từ",
        form: "Thể thường + でしょう？",
        example: "田中さんも行くでしょう？",
      },
      {
        type: "Tính từ い",
        form: "Thể thường + でしょう？",
        example: "このかばん、かわいいでしょう？",
      },
      {
        type: "Danh từ / tính từ な",
        form: "Bỏ だ + でしょう？",
        example: "ここは静かでしょう？",
      },
    ],
    contrasts: [
      "So sánh 明日は寒いでしょう。 (dự đoán) với 今日は寒いでしょう？ (mong người nghe đồng tình). Không chỉ dựa vào dấu hỏi để hiểu mọi trường hợp.",
    ],
  },
  "g-15-03": {
    explanation:
      "Nêu một khả năng mà người nói chưa khẳng định là sự thật. Trong bài này, hãy chú ý sự khác nhau giữa nêu khả năng và đưa ra dự đoán với でしょう; không quy đổi các mẫu thành phần trăm cố định.",
    usage: [
      "Dạng lịch sự: かもしれません. Trong hội thoại thân mật có thể rút gọn thành かも.",
      "Danh từ và tính từ な ở dạng khẳng định hiện tại bỏ だ. Dạng phủ định và quá khứ dùng thể thường tương ứng.",
    ],
    connections: [
      {
        type: "Động từ",
        form: "Thể thường + かもしれない",
        example: "電車が遅れるかもしれない。",
      },
      {
        type: "Tính từ い",
        form: "Thể thường + かもしれない",
        example: "この問題は難しいかもしれない。",
      },
      {
        type: "Tính từ な",
        form: "Bỏ だ + かもしれない",
        example: "明日は暇かもしれない。",
      },
      {
        type: "Danh từ",
        form: "Bỏ だ + かもしれない",
        example: "あの人は学生かもしれない。",
      },
    ],
    situations: [
      "Chưa biết chắc ai đó có đến, thời tiết có thay đổi, hay một việc có xảy ra hay không.",
    ],
    contrasts: [
      "かもしれない nêu khả năng; はずだ nêu điều được suy ra từ một căn cứ đã biết.",
    ],
    mistakes: [
      {
        wrong: "あの人は学生だかもしれない。",
        correct: "あの人は学生かもしれない。",
        reason: "Không giữ だ ở dạng khẳng định hiện tại của danh từ.",
      },
    ],
  },
  "g-15-04": {
    connections: [
      {
        type: "Động từ",
        form: "Thể thường + みたいだ",
        example: "電車が遅れているみたいだ。",
      },
      {
        type: "Tính từ い",
        form: "Thể thường + みたいだ",
        example: "外は寒いみたいだ。",
      },
      {
        type: "Tính từ な",
        form: "Bỏ だ + みたいだ",
        example: "この町は静かみたいだ。",
      },
      {
        type: "Danh từ",
        form: "Bỏ だ + みたいだ",
        example: "今日は休みみたいだ。",
      },
    ],
    situations: [
      "Quan sát một dấu hiệu rồi nói suy đoán của mình trong hội thoại.",
    ],
    contrasts: [
      "Trong cách dùng suy đoán ở bài này, みたいだ gần nghĩa với ようだ. みたいだ thường xuất hiện trong hội thoại; cách kết hợp với danh từ và tính từ な khác nhau.",
    ],
    mistakes: [
      {
        wrong: "休みのみたいだ。",
        correct: "休みみたいだ。",
        reason: "Danh từ nối trực tiếp với みたいだ; không thêm の.",
      },
    ],
  },
  "g-15-05": {
    explanation:
      "Dùng để suy đoán dựa vào dấu hiệu hoặc tình huống quan sát được. Trong cách dùng này, gần nghĩa với みたいだ; ようだ thường dùng trong cách diễn đạt trung tính hoặc trang trọng hơn. Dạng lịch sự là ようです.",
    usage: [
      "Danh từ + のようだ; tính từ な + なようだ. Động từ và tính từ い dùng thể thường.",
      "Bài này tập trung vào suy đoán. ようだ còn có cách dùng so sánh, ví von trong những bài khác.",
    ],
    connections: [
      {
        type: "Động từ",
        form: "Thể thường + ようだ",
        example: "誰も住んでいないようだ。",
      },
      {
        type: "Tính từ い",
        form: "Thể thường + ようだ",
        example: "この料理は辛いようだ。",
      },
      {
        type: "Tính từ な",
        form: "な + ようだ",
        example: "この町は不便なようだ。",
      },
      { type: "Danh từ", form: "の + ようだ", example: "今日は休みのようだ。" },
    ],
    situations: [
      "Cửa hàng đóng cửa và không có người: từ các dấu hiệu đó suy đoán hôm nay là ngày nghỉ.",
    ],
    contrasts: [
      "休みみたいだ và 休みのようだ đều có thể diễn tả suy đoán. Hãy chú ý の khi dùng ようだ.",
    ],
    mistakes: [
      {
        wrong: "今日は休みようだ。",
        correct: "今日は休みのようだ。",
        reason: "Cần の giữa danh từ và ようだ.",
      },
    ],
  },
  "g-15-06": {
    meaning: "Theo căn cứ đã biết thì chắc là / đáng lẽ…",
    explanation:
      "Diễn tả điều người nói suy ra một cách hợp lý từ thông tin hoặc căn cứ đã biết. Đây là sự suy luận hoặc kỳ vọng của người nói, không phải bảo đảm sự việc chắc chắn xảy ra. はずだった / はずだけど còn có thể thể hiện kết quả khác với dự kiến.",
    usage: [
      "Động từ và tính từ い dùng thể thường; danh từ + のはずだ; tính từ な + なはずだ.",
      "Khi luyện tập, hãy nêu rõ căn cứ dẫn đến suy luận.",
    ],
    connections: [
      {
        type: "Động từ",
        form: "Thể thường + はずだ",
        example: "田中さんはもう着いているはずだ。",
      },
      {
        type: "Tính từ い",
        form: "Thể thường + はずだ",
        example: "この店はおいしいはずだ。",
      },
      {
        type: "Tính từ な",
        form: "な + はずだ",
        example: "あまり使っていないので、きれいなはずだ。",
      },
      {
        type: "Danh từ",
        form: "の + はずだ",
        example: "日曜日だから、今日は休みのはずだ。",
      },
    ],
    situations: [
      "Bạn biết lịch trình hoặc vừa nhận tin nhắn, nên suy ra người đó đang ở đâu.",
    ],
    contrasts: [
      "はずだ: suy ra từ căn cứ đã biết. ようだ / みたいだ: suy đoán từ dấu hiệu. かもしれない: nêu khả năng chưa khẳng định.",
    ],
    mistakes: [
      {
        wrong: "今日は休みだはずだ。",
        correct: "今日は休みのはずだ。",
        reason:
          "Ở dạng khẳng định hiện tại, danh từ kết hợp với の trước はずだ.",
      },
    ],
  },
};

const lesson15: Lesson = {
  id: "n4-15",
  level: "N4",
  course: "Dũng Mori",
  number: 15,
  title: "Dự đoán & những điều có thể xảy ra",
  description:
    "Nói về khả năng, suy đoán từ dấu hiệu và giải thích điều mình tin dựa trên căn cứ.",
  goals: [
    "Nhận biết và sử dụng từ vựng phần 15A, 15B.",
    "Phân biệt でしょう, かもしれない, みたいだ, ようだ và はずだ.",
    "Đọc một đoạn ngắn và tìm thông tin để trả lời câu hỏi.",
  ],
  source: {
    title: "Chương 15 · Giáo trình Dũng Mori",
    note: "Nội dung đang có được tổ chức lại. Các đoạn đọc và bài tập bổ sung là nội dung luyện tập biên soạn cho web.",
  },
  vocabulary,
  kanji,
  grammar: grammar.map((item) => ({
    ...item,
    ...guide[item.id],
    examples: item.examples.map((example) => ({
      ...example,
      vi: example.vi
        .replaceAll("chắc chắn", "chắc là")
        .replace("Chắc chắn", "Chắc là"),
    })),
  })),
  referenceTables: plainFormTables.map((table, i) =>
    i === 1
      ? {
          title: "Thể thường của tính từ い · ví dụ 高い",
          rows: [
            {
              tense: "Hiện tại",
              type: "Khẳng định",
              polite: "高いです",
              plain: "高い",
            },
            {
              tense: "Hiện tại",
              type: "Phủ định",
              polite: "高くないです",
              plain: "高くない",
            },
            {
              tense: "Quá khứ",
              type: "Khẳng định",
              polite: "高かったです",
              plain: "高かった",
            },
            {
              tense: "Quá khứ",
              type: "Phủ định",
              polite: "高くなかったです",
              plain: "高くなかった",
            },
          ],
        }
      : i === 0
        ? {
            title: "Thể thường của tính từ な · ví dụ 静か",
            rows: [
              {
                tense: "Hiện tại",
                type: "Khẳng định",
                polite: "静かです",
                plain: "静かだ",
              },
              {
                tense: "Hiện tại",
                type: "Phủ định",
                polite: "静かじゃないです",
                plain: "静かじゃない",
              },
              {
                tense: "Quá khứ",
                type: "Khẳng định",
                polite: "静かでした",
                plain: "静かだった",
              },
              {
                tense: "Quá khứ",
                type: "Phủ định",
                polite: "静かじゃなかったです",
                plain: "静かじゃなかった",
              },
            ],
          }
        : {
            title: "Thể thường của động từ · ví dụ 行く",
            rows: [
              {
                tense: "Hiện tại",
                type: "Khẳng định",
                polite: "行きます",
                plain: "行く",
              },
              {
                tense: "Hiện tại",
                type: "Phủ định",
                polite: "行きません",
                plain: "行かない",
              },
              {
                tense: "Quá khứ",
                type: "Khẳng định",
                polite: "行きました",
                plain: "行った",
              },
              {
                tense: "Quá khứ",
                type: "Phủ định",
                polite: "行きませんでした",
                plain: "行かなかった",
              },
            ],
          },
  ),
  passages: [
    {
      id: "weather",
      title: "Dự báo thời tiết",
      paragraphs: [
        "天気予報です。今日、大阪は曇りで、夕方には雨が降るかもしれません。気温も下がります。",
      ],
      translation: [
        "Đây là dự báo thời tiết. Hôm nay Osaka nhiều mây, chiều tối có thể có mưa. Nhiệt độ cũng sẽ giảm.",
      ],
    },
    {
      id: "ramen",
      title: "Một quán ramen mới",
      paragraphs: [
        "私は昨日、友達と一緒に新しいラーメン屋に行きました。店の前には、たくさんの人が並んでいました。",
      ],
      translation: [
        "Hôm qua tôi cùng bạn đến một quán ramen mới. Trước quán có nhiều người đang xếp hàng.",
      ],
    },
    {
      id: "movie",
      title: "Bốn nhận xét về một bộ phim",
      paragraphs: [
        "映画「ロック・スター」を見た４人のコメントです。",
        "runrun：音楽がとてもよかったです。また見たいです。",
        "taku：話は少し難しかったですが、音楽はよかったです。",
        "プーたろう：俳優が好きです。音楽もよかったです。",
        "米山：話も音楽も楽しめました。",
      ],
      translation: [
        "Nhận xét của bốn người đã xem phim “Rock Star”.",
        "runrun: Nhạc rất hay. Tôi muốn xem lại.",
        "taku: Câu chuyện hơi khó hiểu nhưng nhạc hay.",
        "Pūtarō: Tôi thích diễn viên. Nhạc cũng hay.",
        "Yoneyama: Tôi đã thưởng thức cả câu chuyện lẫn âm nhạc.",
      ],
    },
  ],
  questions: [
    ...questions.map((q) => {
      if (q.id === "q-r-01")
        return {
          ...q,
          passageId: "weather",
          prompt: "大阪の天気はどうですか。",
          explanation:
            "Đoạn đọc nói 大阪は曇り (Osaka nhiều mây) và 夕方には雨が降るかもしれません (chiều tối có thể có mưa). Vì vậy không thể chọn trời nắng, mưa cả ngày hoặc có tuyết.",
        };
      if (q.id === "q-r-02")
        return {
          ...q,
          passageId: "ramen",
          prompt: "正しい文はどれですか。",
          explanation:
            "Câu 店の前には、たくさんの人が並んでいました cho biết nhiều người xếp hàng trước quán. Người kể đi cùng bạn (友達と一緒に), nên lựa chọn đi một mình cũng sai.",
        };
      if (q.id === "q-r-03")
        return {
          ...q,
          passageId: "movie",
          prompt:
            "４人のコメントで、みんながよかったと言っているものは何ですか。",
          explanation:
            "Điểm chung của cả bốn người là nhận xét tốt về âm nhạc (音楽). Runrun nói nhạc rất hay; taku và Pūtarō đều nói nhạc hay; Yoneyama nói đã thưởng thức cả câu chuyện lẫn âm nhạc. Các nhận xét về cốt truyện và diễn viên không được cả bốn người cùng nêu.",
        };
      if (q.id === "q-r-04")
        return {
          ...q,
          passageId: "movie",
          explanation:
            "Tên phim ở ngay câu đầu: 映画「ロック・スター」. Chấp nhận cả ロック・スター và ロックスター; khi viết tiếng Nhật hãy dùng katakana cho tên này.",
        };
      if (q.id === "q-g-05")
        return {
          ...q,
          prompt:
            "田中さんから「今、食堂で昼ご飯を食べています」とメッセージが来ました。田中さんは食堂にいる＿＿です。",
          options: ["はず", "こと", "つもり", "ため"],
          targetIds: ["g-15-06"],
          explanation:
            "Tin nhắn là căn cứ để suy ra Tanaka đang ở nhà ăn. Vì vậy dùng いるはずです. はず diễn tả suy luận từ thông tin đã biết.",
          optionExplanations: {
            こと: "いることです không diễn tả suy luận dựa trên tin nhắn trong tình huống này.",
            つもり:
              "つもり diễn tả dự định; tin nhắn cho biết hành động đang xảy ra.",
            ため: "ため diễn tả mục đích hoặc nguyên nhân, không diễn tả suy luận này.",
          },
        };
      if (q.category === "grammar") {
        const targets: Record<string, string> = {
          "q-g-01": "g-15-01",
          "q-g-02": "g-15-01",
          "q-g-03": "g-15-03",
          "q-g-04": "g-15-04",
          "q-g-06": "g-15-05",
          "q-g-07": "g-15-06",
          "q-g-08": "g-15-02",
        };
        return { ...q, targetIds: [targets[q.id]] };
      }
      return q;
    }),
    {
      id: "q-g-09",
      category: "grammar",
      kind: "mcq",
      chapter: "15B",
      prompt: "今日は休み＿＿ようです。",
      options: ["の", "な", "だ", "に"],
      answer: "の",
      targetIds: ["g-15-05"],
      explanation:
        "休み là danh từ. Danh từ kết hợp với の trước ようです: 休みのようです (hình như là ngày nghỉ).",
      optionExplanations: {
        な: "な dùng sau tính từ な; 休み ở đây là danh từ.",
        だ: "Không giữ だ trước ようです; danh từ khẳng định hiện tại dùng の.",
        に: "に không phải dạng kết hợp của danh từ trước ようです trong mẫu suy đoán này.",
      },
    },
    {
      id: "q-g-10",
      category: "grammar",
      kind: "mcq",
      chapter: "15B",
      prompt: "この町は不便＿＿ようです。",
      options: ["な", "の", "だ", "に"],
      answer: "な",
      targetIds: ["g-15-05"],
      explanation:
        "不便 là tính từ な. Dùng 不便なようです (thị trấn này có vẻ bất tiện).",
      optionExplanations: {
        の: "の dùng sau danh từ, còn 不便 ở đây là tính từ な.",
        だ: "Dạng khẳng định hiện tại của tính từ な đổi だ thành な trước ようです.",
        に: "に thường dùng khi bổ nghĩa cho động từ; ở đây cần な trước ようです.",
      },
    },
    {
      id: "q-g-11",
      category: "grammar",
      kind: "fill",
      chapter: "15B",
      prompt:
        "Dùng かもしれません để nói: “Người đó có lẽ là sinh viên.” Điền phần còn thiếu: あの人は学生＿＿。",
      answer: "かもしれません|かもしれない",
      targetIds: ["g-15-03"],
      explanation:
        "Danh từ 学生 nối trực tiếp với かもしれません, không thêm だ. Cũng chấp nhận dạng thường かもしれない để luyện nhận biết mẫu.",
    },
    {
      id: "q-g-12",
      category: "grammar",
      kind: "mcq",
      chapter: "15B",
      prompt: "「今日は休みのようです」を、みたいですを使って言い換えると？",
      options: [
        "今日は休みみたいです。",
        "今日は休みのみたいです。",
        "今日は休みなみたいです。",
        "今日は休みだみたいです。",
      ],
      answer: "今日は休みみたいです。",
      targetIds: ["g-15-04", "g-15-05"],
      explanation:
        "Danh từ nối trực tiếp với みたいです: 休みみたいです. Với ようです thì cần の: 休みのようです.",
      optionExplanations: {
        "今日は休みのみたいです。":
          "の là cách kết hợp với ようです, không dùng trước みたいです.",
        "今日は休みなみたいです。":
          "Không thêm な giữa danh từ 休み và みたいです.",
        "今日は休みだみたいです。":
          "Bỏ だ ở dạng khẳng định hiện tại trước みたいです.",
      },
    },
  ],
};

export default lesson15;
