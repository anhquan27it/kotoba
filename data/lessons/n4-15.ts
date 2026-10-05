import type { Lesson } from "@/lib/types";

// Canonical chapter 15 content. Legacy data modules re-export these same entries.
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
    title: "Dũng Mori · Tài liệu khóa online sơ cấp N4 · Chương 15",
    note: "Nguồn: N4_Chương15.pdf do người học cung cấp (16 trang), đối chiếu ngày 05/10/2026. Danh sách 46 từ, 8 kanji, 6 mẫu ngữ pháp và ba đoạn đọc dựa trên tài liệu. Ba đoạn đọc giữ đầy đủ nội dung để học, thay cho bản rút gọn trước đây. Đã sửa lỗi in 好きだってようです thành 好きだったようです ở đoạn ramen; các ví dụ về lịch xe buýt được biên tập thành バスの時刻表 / バスは1日に5本. Nghĩa từ và giải thích được hiệu chỉnh khi cách dịch trong nguồn dễ gây nhầm: 中止 là hủy/ngừng, không đồng nghĩa với 延期 (hoãn); はずだ và でしょう không bảo đảm sự việc đúng tuyệt đối. Câu ví dụ từ vựng, một số từ ghép kanji bổ sung, bản dịch, bảng kết hợp, phân biệt/lỗi thường gặp, câu hỏi và đáp án/giải thích là nội dung biên soạn hoặc biên tập bổ sung của Kotoba; không phải toàn bộ ví dụ và đáp án nguyên bản của giáo trình. Phần nghe chưa triển khai.",
  },
  vocabulary: [
    {
      id: "v15a-01",
      word: "本物",
      reading: "ほんもの",
      meaning: "hàng thật, đồ thật",
      pos: "Danh từ",
      chapter: "15A",
      examples: [
        {
          jp: "これは本物の革です。",
          vi: "Đây là da thật.",
        },
        {
          jp: "本物みたいですね。",
          vi: "Có vẻ là hàng thật nhỉ.",
        },
      ],
    },
    {
      id: "v15a-02",
      word: "彼",
      reading: "かれ",
      meaning: "anh ấy; bạn trai (tùy ngữ cảnh)",
      pos: "Danh từ",
      chapter: "15A",
      examples: [
        {
          jp: "彼は私の友達です。",
          vi: "Anh ấy là bạn của tôi.",
        },
        {
          jp: "昨日、彼に会いました。",
          vi: "Hôm qua tôi đã gặp anh ấy.",
        },
      ],
    },
    {
      id: "v15a-03",
      word: "台風",
      reading: "たいふう",
      meaning: "cơn bão",
      pos: "Danh từ",
      chapter: "15A",
      examples: [
        {
          jp: "台風が来るかもしれません。",
          vi: "Có thể bão sẽ đến.",
        },
        {
          jp: "台風で学校が休みになりました。",
          vi: "Vì bão nên trường đã nghỉ học.",
        },
      ],
    },
    {
      id: "v15a-04",
      word: "洗濯物",
      reading: "せんたくもの",
      meaning: "đồ bẩn cần giặt / đồ đã giặt",
      pos: "Danh từ",
      chapter: "15A",
      examples: [
        {
          jp: "洗濯物が乾きました。",
          vi: "Quần áo (đồ giặt) đã khô.",
        },
        {
          jp: "洗濯物がまだ乾いていません。",
          vi: "Đồ giặt vẫn chưa khô.",
        },
      ],
    },
    {
      id: "v15a-05",
      word: "遊園地",
      reading: "ゆうえんち",
      meaning: "khu giải trí, công viên giải trí",
      pos: "Danh từ",
      chapter: "15A",
      examples: [
        {
          jp: "子供と遊園地に行きました。",
          vi: "Tôi đã đi khu vui chơi với con.",
        },
        {
          jp: "この遊園地は週末に混みます。",
          vi: "Khu vui chơi này cuối tuần rất đông.",
        },
      ],
    },
    {
      id: "v15a-06",
      word: "ハイキング",
      reading: "ハイキング",
      meaning: "đi bộ dã ngoại; đi bộ đường dài",
      pos: "Danh từ",
      chapter: "15A",
      examples: [
        {
          jp: "週末にハイキングに行きます。",
          vi: "Cuối tuần tôi đi bộ dã ngoại.",
        },
        {
          jp: "山でハイキングを楽しみました。",
          vi: "Tôi đã tận hưởng chuyến đi bộ trên núi.",
        },
      ],
    },
    {
      id: "v15a-07",
      word: "厳しい",
      reading: "きびしい",
      meaning: "nghiêm khắc, khắt khe; gay gắt",
      pos: "Tính từ い",
      chapter: "15A",
      examples: [
        {
          jp: "田中先生は厳しいです。",
          vi: "Thầy Tanaka rất nghiêm khắc.",
        },
        {
          jp: "今年の試験は厳しいでしょう。",
          vi: "Kỳ thi năm nay chắc sẽ khó khăn.",
        },
      ],
    },
    {
      id: "v15a-08",
      word: "混む",
      reading: "こむ",
      meaning: "đông đúc; chật, ùn tắc",
      pos: "Động từ nhóm I (tự động từ)",
      chapter: "15A",
      examples: [
        {
          jp: "電車が混んでいます。",
          vi: "Tàu điện đang đông đúc.",
        },
        {
          jp: "この道は朝、混みます。",
          vi: "Con đường này buổi sáng rất đông.",
        },
      ],
    },
    {
      id: "v15a-09",
      word: "上がる",
      reading: "あがる",
      meaning: "leo lên; tăng lên",
      pos: "Động từ nhóm I (tự động từ)",
      chapter: "15A",
      examples: [
        {
          jp: "気温が上がります。",
          vi: "Nhiệt độ tăng lên.",
        },
        {
          jp: "値段が上がりました。",
          vi: "Giá đã tăng lên.",
        },
      ],
    },
    {
      id: "v15a-10",
      word: "下がる",
      reading: "さがる",
      meaning: "giảm xuống; hạ xuống",
      pos: "Động từ nhóm I (tự động từ)",
      chapter: "15A",
      examples: [
        {
          jp: "明日は気温が下がるでしょう。",
          vi: "Ngày mai nhiệt độ chắc sẽ giảm.",
        },
        {
          jp: "熱が下がりました。",
          vi: "Cơn sốt đã hạ.",
        },
      ],
    },
    {
      id: "v15a-11",
      word: "乾く",
      reading: "かわく",
      meaning: "khô (quần áo, không khí…)",
      pos: "Động từ nhóm I (tự động từ)",
      chapter: "15A",
      examples: [
        {
          jp: "服が乾きました。",
          vi: "Quần áo đã khô.",
        },
        {
          jp: "空気が乾いています。",
          vi: "Không khí đang khô.",
        },
      ],
    },
    {
      id: "v15a-12",
      word: "止む",
      reading: "やむ",
      meaning: "dừng; tạnh (mưa)",
      pos: "Động từ nhóm I (tự động từ)",
      chapter: "15A",
      examples: [
        {
          jp: "雨が止みました。",
          vi: "Mưa đã tạnh.",
        },
        {
          jp: "雨が止むまで待ちましょう。",
          vi: "Hãy đợi đến khi mưa tạnh.",
        },
      ],
    },
    {
      id: "v15a-13",
      word: "叶う",
      reading: "かなう",
      meaning: "(ước mơ) thành hiện thực",
      pos: "Động từ nhóm I (tự động từ)",
      chapter: "15A",
      examples: [
        {
          jp: "夢が叶いました。",
          vi: "Ước mơ đã thành hiện thực.",
        },
        {
          jp: "願いが叶うといいですね。",
          vi: "Mong là điều ước thành hiện thực.",
        },
      ],
    },
    {
      id: "v15a-14",
      word: "楽しむ",
      reading: "たのしむ",
      meaning: "tận hưởng; thưởng thức",
      pos: "Động từ nhóm I (tha động từ)",
      chapter: "15A",
      examples: [
        {
          jp: "旅行を楽しみました。",
          vi: "Tôi đã tận hưởng chuyến du lịch.",
        },
        {
          jp: "サッカーを楽しんでいます。",
          vi: "Tôi đang chơi bóng đá một cách vui vẻ.",
        },
      ],
    },
    {
      id: "v15a-15",
      word: "返す",
      reading: "かえす",
      meaning: "trả lại",
      pos: "Động từ nhóm I (tha động từ)",
      chapter: "15A",
      examples: [
        {
          jp: "本を図書館に返しました。",
          vi: "Tôi đã trả sách cho thư viện.",
        },
        {
          jp: "借りたお金を返します。",
          vi: "Tôi sẽ trả lại số tiền đã mượn.",
        },
      ],
    },
    {
      id: "v15a-16",
      word: "中止する",
      reading: "ちゅうしする",
      meaning: "hủy; ngừng, dừng (một hoạt động)",
      pos: "Động từ nhóm III (中止 là danh từ)",
      chapter: "15A",
      examples: [
        {
          jp: "雨で試合が中止になりました。",
          vi: "Trận đấu bị hủy vì mưa.",
        },
        {
          jp: "イベントを中止しました。",
          vi: "Tôi đã hủy sự kiện.",
        },
      ],
    },
    {
      id: "v15a-17",
      word: "成功する",
      reading: "せいこうする",
      meaning: "thành công",
      pos: "Động từ nhóm III (成功 là danh từ)",
      chapter: "15A",
      examples: [
        {
          jp: "計画は成功しました。",
          vi: "Kế hoạch đã thành công.",
        },
        {
          jp: "新しい計画が成功して、うれしいです。",
          vi: "Tôi vui vì kế hoạch mới đã thành công.",
        },
      ],
    },
    {
      id: "v15a-18",
      word: "失敗する",
      reading: "しっぱいする",
      meaning: "thất bại",
      pos: "Động từ nhóm III (失敗 là danh từ)",
      chapter: "15A",
      examples: [
        {
          jp: "ダイエットは失敗するだろう。",
          vi: "Việc ăn kiêng chắc sẽ thất bại.",
        },
        {
          jp: "料理に失敗しました。",
          vi: "Tôi đã nấu ăn thất bại.",
        },
      ],
    },
    {
      id: "v15a-19",
      word: "きっと",
      reading: "きっと",
      meaning: "chắc là; nhất định (niềm tin mạnh của người nói)",
      pos: "Phó từ",
      chapter: "15A",
      examples: [
        {
          jp: "きっと合格するでしょう。",
          vi: "Chắc là sẽ đỗ thôi.",
        },
        {
          jp: "明日はきっと晴れます。",
          vi: "Ngày mai chắc trời sẽ nắng.",
        },
      ],
    },
    {
      id: "v15a-20",
      word: "ただいま",
      reading: "ただいま",
      meaning: "Con/anh/em… đã về rồi đây (lời chào khi trở về)",
      pos: "Cụm từ chào hỏi",
      chapter: "15A",
      examples: [
        {
          jp: "ただいま！",
          vi: "Con đã về rồi đây!",
        },
        {
          jp: "A：ただいま。　B：おかえり。",
          vi: "A: Con về rồi.　B: Con về rồi đấy à.",
        },
      ],
    },
    {
      id: "v15a-21",
      word: "おかえり（なさい）",
      reading: "おかえり（なさい）",
      meaning: "Con/anh/em… đã về rồi đấy à! (lời chào đón ai quay về)",
      pos: "Cụm từ chào hỏi",
      chapter: "15A",
      examples: [
        {
          jp: "おかえりなさい！",
          vi: "Bạn đã về rồi đấy à!",
        },
        {
          jp: "おかえり。外は寒かったでしょう。",
          vi: "Bạn về rồi à. Ngoài trời chắc lạnh lắm nhỉ.",
        },
      ],
    },
    {
      id: "v15b-01",
      word: "風邪",
      reading: "かぜ",
      meaning: "cảm lạnh",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "風邪を引きました。",
          vi: "Tôi bị cảm lạnh.",
        },
        {
          jp: "風邪を引いたから、仕事を休みます。",
          vi: "Vì bị cảm nên tôi nghỉ làm.",
        },
      ],
    },
    {
      id: "v15b-02",
      word: "救急車",
      reading: "きゅうきゅうしゃ",
      meaning: "xe cấp cứu",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "救急車を呼びました。",
          vi: "Tôi đã gọi xe cấp cứu.",
        },
        {
          jp: "救急車が来ました。",
          vi: "Xe cấp cứu đã đến.",
        },
      ],
    },
    {
      id: "v15b-03",
      word: "事故",
      reading: "じこ",
      meaning: "tai nạn",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "この交差点で事故がありました。",
          vi: "Ở ngã tư này đã có tai nạn.",
        },
        {
          jp: "事故に気をつけてください。",
          vi: "Hãy cẩn thận tai nạn nhé.",
        },
      ],
    },
    {
      id: "v15b-04",
      word: "雷",
      reading: "かみなり",
      meaning: "sấm sét",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "雷が鳴っています。",
          vi: "Sấm đang rền vang.",
        },
        {
          jp: "雷が怖いです。",
          vi: "Tôi sợ sấm sét.",
        },
      ],
    },
    {
      id: "v15b-05",
      word: "留守",
      reading: "るす",
      meaning: "vắng nhà",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "家を留守にしました。",
          vi: "Tôi đã vắng nhà.",
        },
        {
          jp: "留守の間に電話がありました。",
          vi: "Có điện thoại gọi đến lúc tôi vắng nhà.",
        },
      ],
    },
    {
      id: "v15b-06",
      word: "旅館",
      reading: "りょかん",
      meaning: "lữ quán, nhà trọ kiểu Nhật",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "旅館に泊まりました。",
          vi: "Tôi đã nghỉ ở lữ quán.",
        },
        {
          jp: "この旅館は有名です。",
          vi: "Lữ quán này nổi tiếng.",
        },
      ],
    },
    {
      id: "v15b-07",
      word: "旅行客",
      reading: "りょこうきゃく",
      meaning: "khách du lịch",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "旅行客がたくさんいます。",
          vi: "Có nhiều khách du lịch.",
        },
        {
          jp: "駅に旅行客が集まっています。",
          vi: "Khách du lịch đang tập trung ở ga.",
        },
      ],
    },
    {
      id: "v15b-08",
      word: "入り口",
      reading: "いりぐち",
      meaning: "lối vào, cửa vào",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "入り口で待っています。",
          vi: "Tôi đang đợi ở lối vào.",
        },
        {
          jp: "入り口が閉まっていました。",
          vi: "Lối vào đã bị đóng.",
        },
      ],
    },
    {
      id: "v15b-09",
      word: "有名人",
      reading: "ゆうめいじん",
      meaning: "người nổi tiếng",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "あの人は有名人です。",
          vi: "Người đó là người nổi tiếng.",
        },
        {
          jp: "有名人に会いました。",
          vi: "Tôi đã gặp người nổi tiếng.",
        },
      ],
    },
    {
      id: "v15b-10",
      word: "調味料",
      reading: "ちょうみりょう",
      meaning: "gia vị",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "調味料を買いました。",
          vi: "Tôi đã mua gia vị.",
        },
        {
          jp: "この料理は調味料が足りません。",
          vi: "Món này thiếu gia vị.",
        },
      ],
    },
    {
      id: "v15b-11",
      word: "平日",
      reading: "へいじつ",
      meaning: "ngày thường (ngày không phải ngày nghỉ hoặc ngày lễ)",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "平日は電車が混みます。",
          vi: "Ngày thường tàu điện rất đông.",
        },
        {
          jp: "平日の午前は空いています。",
          vi: "Buổi sáng ngày thường thì vắng.",
        },
      ],
    },
    {
      id: "v15b-12",
      word: "ガソリン",
      reading: "ガソリン",
      meaning: "xăng",
      pos: "Danh từ",
      chapter: "15B",
      examples: [
        {
          jp: "ガソリンが高くなりました。",
          vi: "Xăng đã đắt lên.",
        },
        {
          jp: "ガソリンスタンドで止まりました。",
          vi: "Tôi đã dừng ở cây xăng.",
        },
      ],
    },
    {
      id: "v15b-13",
      word: "真っ暗",
      reading: "まっくら",
      meaning: "tối om",
      pos: "Tính từ な",
      chapter: "15B",
      examples: [
        {
          jp: "部屋の中は真っ暗です。",
          vi: "Trong phòng tối om.",
        },
        {
          jp: "外はもう真っ暗になりました。",
          vi: "Ngoài trời đã tối om rồi.",
        },
      ],
    },
    {
      id: "v15b-14",
      word: "同じ",
      reading: "おなじ",
      meaning: "giống, giống nhau",
      pos: "Tính từ な (đặc biệt — kết hợp thẳng với danh từ, không có な)",
      chapter: "15B",
      examples: [
        {
          jp: "同じ人に会いました。",
          vi: "Tôi đã gặp cùng một người.",
        },
        {
          jp: "私も同じです。",
          vi: "Tôi cũng giống vậy.",
        },
      ],
    },
    {
      id: "v15b-15",
      word: "引く",
      reading: "ひく",
      meaning: "kéo; bị cảm lạnh (風邪を引く)",
      pos: "Động từ nhóm I (tha động từ)",
      chapter: "15B",
      examples: [
        {
          jp: "風邪を引いたから、仕事を休みました。",
          vi: "Vì bị cảm nên tôi đã nghỉ làm.",
        },
        {
          jp: "ドアを引いてください。",
          vi: "Hãy kéo cửa.",
        },
      ],
    },
    {
      id: "v15b-16",
      word: "集まる",
      reading: "あつまる",
      meaning: "tập trung, tụ tập",
      pos: "Động từ nhóm I (tự động từ)",
      chapter: "15B",
      examples: [
        {
          jp: "駅に人が集まっています。",
          vi: "Mọi người đang tập trung ở ga.",
        },
        {
          jp: "友達が家に集まりました。",
          vi: "Bạn bè đã tụ tập ở nhà tôi.",
        },
      ],
    },
    {
      id: "v15b-17",
      word: "差す",
      reading: "さす",
      meaning: "giương, che (ô: 傘を差す)",
      pos: "Động từ nhóm I (tha động từ)",
      chapter: "15B",
      examples: [
        {
          jp: "傘を差しています。",
          vi: "Tôi đang giương ô.",
        },
        {
          jp: "雨が降ったから、傘を差しました。",
          vi: "Vì trời mưa nên tôi đã giương ô.",
        },
      ],
    },
    {
      id: "v15b-18",
      word: "届く",
      reading: "とどく",
      meaning: "đến nơi; được chuyển tới (thư, hàng…)",
      pos: "Động từ nhóm I (tự động từ)",
      chapter: "15B",
      examples: [
        {
          jp: "荷物が届きました。",
          vi: "Hàng đã được gửi đến.",
        },
        {
          jp: "手紙が届くのを待っています。",
          vi: "Tôi đang đợi thư gửi đến.",
        },
      ],
    },
    {
      id: "v15b-19",
      word: "なくなる",
      reading: "なくなる",
      meaning: "mất, biến mất, hết",
      pos: "Động từ nhóm I (tự động từ)",
      chapter: "15B",
      examples: [
        {
          jp: "財布がなくなりました。",
          vi: "Ví đã biến mất.",
        },
        {
          jp: "砂糖がなくなりました。",
          vi: "Đường đã hết.",
        },
      ],
    },
    {
      id: "v15b-20",
      word: "ぶつかる",
      reading: "ぶつかる",
      meaning: "va phải, đụng phải",
      pos: "Động từ nhóm I (tự động từ)",
      chapter: "15B",
      examples: [
        {
          jp: "車が木にぶつかりました。",
          vi: "Chiếc xe đã đụng phải cây.",
        },
        {
          jp: "自転車とぶつかりました。",
          vi: "Tôi đã đụng phải xe đạp.",
        },
      ],
    },
    {
      id: "v15b-21",
      word: "できる",
      reading: "できる",
      meaning: "hoàn thành, xong; có thể",
      pos: "Động từ nhóm II (tự động từ)",
      chapter: "15B",
      examples: [
        {
          jp: "家ができました。",
          vi: "Ngôi nhà đã hoàn thành.",
        },
        {
          jp: "料理ができました。",
          vi: "Món ăn đã xong.",
        },
      ],
    },
    {
      id: "v15b-22",
      word: "怪我する",
      reading: "けがする",
      meaning: "bị thương",
      pos: "Động từ nhóm III (怪我 là danh từ)",
      chapter: "15B",
      examples: [
        {
          jp: "足に怪我をしました。",
          vi: "Tôi bị thương ở chân.",
        },
        {
          jp: "転んで、怪我をしました。",
          vi: "Tôi bị ngã và bị thương.",
        },
      ],
    },
    {
      id: "v15b-23",
      word: "すぐに",
      reading: "すぐに",
      meaning: "ngay lập tức, lập tức",
      pos: "Phó từ",
      chapter: "15B",
      examples: [
        {
          jp: "すぐに帰ります。",
          vi: "Tôi về ngay lập tức.",
        },
        {
          jp: "すぐに病院へ行ってください。",
          vi: "Hãy đến bệnh viện ngay lập tức.",
        },
      ],
    },
    {
      id: "v15b-24",
      word: "だいぶ",
      reading: "だいぶ",
      meaning: "khá là, đáng kể",
      pos: "Phó từ",
      chapter: "15B",
      examples: [
        {
          jp: "だいぶ寒くなりました。",
          vi: "Trời đã lạnh đi đáng kể.",
        },
        {
          jp: "この町はだいぶ不便です。",
          vi: "Thị trấn này khá là bất tiện.",
        },
      ],
    },
    {
      id: "v15b-25",
      word: "もしかしたら",
      reading: "もしかしたら",
      meaning: "có lẽ, biết đâu",
      pos: "Phó từ",
      chapter: "15B",
      examples: [
        {
          jp: "もしかしたら雨が降るかもしれません。",
          vi: "Có lẽ trời sẽ mưa.",
        },
        {
          jp: "もしかしたら、あの人はベトナム人かもしれませんね。",
          vi: "Biết đâu người đó là người Việt Nam.",
        },
      ],
    },
  ],
  kanji: [
    {
      id: "k-15-01",
      char: "力",
      hanViet: "LỰC",
      meaning: "sức mạnh",
      kunyomi: ["ちから"],
      onyomi: ["リョク", "リキ"],
      chapter: "15.1",
      examples: [
        {
          jp: "力",
          reading: "ちから",
          vi: "sức mạnh",
        },
        {
          jp: "協力",
          reading: "きょうりょく",
          vi: "hợp tác, hiệp lực",
        },
        {
          jp: "全力",
          reading: "ぜんりょく",
          vi: "toàn lực",
        },
      ],
    },
    {
      id: "k-15-02",
      char: "動",
      hanViet: "ĐỘNG",
      meaning: "chuyển động, cử động",
      kunyomi: ["うご・く", "うご・かす"],
      onyomi: ["ドウ"],
      chapter: "15.1",
      examples: [
        {
          jp: "動く",
          reading: "うごく",
          vi: "cử động, chuyển động",
        },
        {
          jp: "運動",
          reading: "うんどう",
          vi: "vận động, thể dục",
        },
        {
          jp: "自動",
          reading: "じどう",
          vi: "tự động",
        },
        {
          jp: "動画",
          reading: "どうが",
          vi: "video, clip",
        },
        {
          jp: "動物",
          reading: "どうぶつ",
          vi: "động vật",
        },
        {
          jp: "感動",
          reading: "かんどう",
          vi: "cảm động, ấn tượng",
        },
        {
          jp: "不動産",
          reading: "ふどうさん",
          vi: "bất động sản",
        },
      ],
    },
    {
      id: "k-15-03",
      char: "働",
      hanViet: "ĐỘNG",
      meaning: "làm việc",
      kunyomi: ["はたら・く"],
      onyomi: ["ドウ"],
      chapter: "15.1",
      examples: [
        {
          jp: "働く",
          reading: "はたらく",
          vi: "làm việc",
        },
        {
          jp: "働き",
          reading: "はたらき",
          vi: "sự làm việc, công việc",
        },
      ],
    },
    {
      id: "k-15-04",
      char: "知",
      hanViet: "TRI",
      meaning: "biết",
      kunyomi: ["し・る"],
      onyomi: ["チ"],
      chapter: "15.2",
      examples: [
        {
          jp: "知る",
          reading: "しる",
          vi: "biết",
        },
        {
          jp: "お知らせ",
          reading: "おしらせ",
          vi: "thông báo",
        },
        {
          jp: "知り合い",
          reading: "しりあい",
          vi: "người quen",
        },
        {
          jp: "承知",
          reading: "しょうち",
          vi: "đồng ý, hiểu rõ",
        },
      ],
    },
    {
      id: "k-15-05",
      char: "短",
      hanViet: "ĐOẢN",
      meaning: "ngắn",
      kunyomi: ["みじか・い"],
      onyomi: ["タン"],
      chapter: "15.2",
      examples: [
        {
          jp: "短い",
          reading: "みじかい",
          vi: "ngắn",
        },
        {
          jp: "短気",
          reading: "たんき",
          vi: "nóng nảy, dễ nổi nóng",
        },
      ],
    },
    {
      id: "k-15-06",
      char: "医",
      hanViet: "Y",
      meaning: "y học, chữa bệnh",
      kunyomi: [],
      onyomi: ["イ"],
      chapter: "15.2",
      examples: [
        {
          jp: "医者",
          reading: "いしゃ",
          vi: "bác sĩ",
        },
        {
          jp: "歯医者",
          reading: "はいしゃ",
          vi: "nha sĩ",
        },
        {
          jp: "医学",
          reading: "いがく",
          vi: "y học",
        },
      ],
    },
    {
      id: "k-15-07",
      char: "皿",
      hanViet: "MÃNH",
      meaning: "cái đĩa",
      kunyomi: ["さら"],
      onyomi: [],
      chapter: "15.3",
      examples: [
        {
          jp: "お皿",
          reading: "おさら",
          vi: "chiếc đĩa",
        },
        {
          jp: "皿洗い",
          reading: "さらあらい",
          vi: "rửa bát đĩa",
        },
      ],
    },
    {
      id: "k-15-08",
      char: "血",
      hanViet: "HUYẾT",
      meaning: "máu",
      kunyomi: ["ち"],
      onyomi: ["ケツ"],
      chapter: "15.3",
      examples: [
        {
          jp: "血",
          reading: "ち",
          vi: "máu",
        },
        {
          jp: "血液",
          reading: "けつえき",
          vi: "máu, huyết dịch",
        },
      ],
    },
  ],
  grammar: [
    {
      id: "g-15-01",
      pattern: "～でしょう / ～だろう (phán đoán)",
      meaning: "Có lẽ / chắc là… (dự đoán)",
      chapter: "15A",
      explanation:
        "Dùng khi người nói dự đoán một điều chưa xác nhận. だろう là dạng thường tương ứng với でしょう. Sắc thái chắc là/có lẽ tùy bối cảnh, không phải lời bảo đảm hay một tỷ lệ phần trăm cố định.",
      usage: [
        "Thường đi với các phó từ như 「多分」「きっと」…",
        "Trong văn nói, sau 「でしょう / だろう」 thường thêm vĩ tố 「ね」「な」…",
        "Có thể thêm 「から」 vào sau 「だろう」 để nêu nguyên nhân mà người nói dự đoán.",
        "「～でしょう / ～だろう」 thường KHÔNG dùng để nói về hành động có ý chí của bản thân trong tương lai.",
        "Danh từ/tính từ な chỉ bỏ だ ở khẳng định phi quá khứ. Quá khứ và phủ định giữ dạng thường: 休みだったでしょう, 静かではないでしょう.",
      ],
      examples: [
        {
          jp: "たくさん勉強したから、きっと合格するだろうなあ。",
          vi: "Vì đã học rất nhiều nên chắc là sẽ đỗ.",
        },
        {
          jp: "忙しいだろうから、無理して参加しなくてもいいですよ。",
          vi: "Chắc anh/chị bận nên không cần cố tham gia đâu ạ.",
        },
        {
          jp: "明日は今日より気温が下がるでしょう。",
          vi: "Ngày mai nhiệt độ chắc sẽ thấp hơn hôm nay.",
        },
        {
          jp: "A：ただいま。B：おかえり。外、寒かったでしょう。",
          vi: "A: Tôi về rồi. B: Bạn về rồi à. Ngoài trời chắc lạnh lắm nhỉ.",
        },
        {
          jp: "ダイエットは多分失敗するだろう。",
          vi: "Việc ăn kiêng có lẽ sẽ thất bại.",
        },
        {
          jp: "あの人はにぎやかなところが嫌いだから、パーティーに来ないでしょうね。",
          vi: "Người đó không thích nơi náo nhiệt nên chắc sẽ không đến buổi tiệc nhỉ.",
        },
        {
          jp: "台風が来るから、学校は休みだろうね。",
          vi: "Vì bão đến nên trường chắc sẽ nghỉ nhỉ.",
        },
        {
          jp: "鈴木：明日はテストだね。ミン：厳しい上田先生のテストだから、難しいだろうね。",
          vi: "Suzuki: Mai có bài kiểm tra nhỉ. Minh: Đó là bài kiểm tra của thầy/cô Ueda nghiêm khắc nên chắc sẽ khó nhỉ.",
        },
      ],
      situations: [
        "Dự đoán thời tiết, kết quả hoặc một tình huống chưa biết chắc, ở hiện tại, tương lai hay quá khứ.",
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
          form: "Khẳng định phi quá khứ: bỏ だ + でしょう",
          example: "この町は静かでしょう。",
        },
        {
          type: "Danh từ",
          form: "Khẳng định phi quá khứ: bỏ だ + でしょう",
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
        {
          jp: "山田：このお菓子、おいしいですね。マイ：そうでしょう。有名な店のお菓子ですからね。",
          vi: "Yamada: Bánh này ngon nhỉ. Mai: Đúng không nào. Vì đó là bánh của một cửa hàng nổi tiếng mà.",
        },
      ],
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
          form: "Khẳng định phi quá khứ: bỏ だ + でしょう？",
          example: "ここは静かでしょう？",
        },
      ],
      contrasts: [
        "So sánh 明日は寒いでしょう。 (dự đoán) với 今日は寒いでしょう？ (mong người nghe đồng tình). Không chỉ dựa vào dấu hỏi để hiểu mọi trường hợp.",
      ],
      mistakes: [
        {
          wrong: "この町は静かだでしょう？",
          correct: "この町は静かでしょう？",
          reason:
            "Ở dạng khẳng định phi quá khứ, bỏ だ của tính từ な trước でしょう; không giữ だ chỉ vì đây là câu hỏi xác nhận.",
        },
      ],
    },
    {
      id: "g-15-03",
      pattern: "～かもしれない",
      meaning: "Có lẽ ～ / Có khi ～ / không chừng ～",
      chapter: "15B",
      explanation:
        "Nêu một khả năng mà người nói chưa khẳng định là sự thật. Trong bài này, hãy chú ý sự khác nhau giữa nêu khả năng và đưa ra dự đoán với でしょう; không quy đổi các mẫu thành phần trăm cố định.",
      usage: [
        "Dạng lịch sự: かもしれません. Trong hội thoại thân mật có thể rút gọn thành かも.",
        "Danh từ và tính từ な ở dạng khẳng định hiện tại bỏ だ. Dạng phủ định và quá khứ dùng thể thường tương ứng.",
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
          form: "Khẳng định phi quá khứ: bỏ だ + かもしれない",
          example: "明日は暇かもしれない。",
        },
        {
          type: "Danh từ",
          form: "Khẳng định phi quá khứ: bỏ だ + かもしれない",
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
    {
      id: "g-15-04",
      pattern: "～みたいだ",
      meaning: "Hình như ～ / Có vẻ ～",
      chapter: "15B",
      explanation:
        "Dùng để đưa ra phán đoán dựa trên điều bản thân nhìn thấy, nghe thấy, cảm nhận thấy. Thường dùng trong văn nói.",
      usage: [
        "Động từ và tính từ い dùng thể thường. Danh từ/tính từ な chỉ bỏ だ ở khẳng định phi quá khứ: 休みみたいだ / 静かみたいだ. Quá khứ và phủ định giữ thể thường: 休みだったみたいだ / 静かではないみたいだ.",
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
        {
          jp: "あの人はお金持ちみたいですね。",
          vi: "Người đó có vẻ giàu có nhỉ.",
        },
      ],
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
          form: "Khẳng định phi quá khứ: bỏ だ + みたいだ",
          example: "この町は静かみたいだ。",
        },
        {
          type: "Danh từ",
          form: "Khẳng định phi quá khứ: bỏ だ + みたいだ",
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
    {
      id: "g-15-05",
      pattern: "～ようだ",
      meaning: "Hình như ～ / Có vẻ ～",
      chapter: "15B",
      explanation:
        "Dùng để suy đoán dựa vào dấu hiệu hoặc tình huống quan sát được. Trong cách dùng này, gần nghĩa với みたいだ; ようだ thường dùng trong cách diễn đạt trung tính hoặc trang trọng hơn. Dạng lịch sự là ようです.",
      usage: [
        "Ở khẳng định phi quá khứ: danh từ + のようだ; tính từ な + なようだ. Động từ và tính từ い dùng thể thường.",
        "Ở quá khứ hoặc phủ định của danh từ/tính từ な, nối thể thường trực tiếp: 休みだったようだ / 静かではないようだ. Không thêm の / な sau だった / ではない.",
        "ようだ cũng dùng trong hội thoại. みたいだ mang sắc thái khẩu ngữ hơn; dạng lịch sự của mỗi mẫu là ようです / みたいです.",
        "Bài này tập trung vào suy đoán; ようだ còn có cách dùng so sánh, ví von.",
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
          jp: "私は旅館を出て、バスの時刻表を確認した。バスは1日に5本しかなかった。この町はだいぶ不便なようだ。",
          vi: "Tôi rời lữ quán và kiểm tra thời gian biểu xe buýt. Xe buýt chỉ có năm chuyến mỗi ngày. Thị trấn này có vẻ khá bất tiện.",
        },
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
          form: "Khẳng định phi quá khứ: な + ようだ",
          example: "この町は不便なようだ。",
        },
        {
          type: "Danh từ",
          form: "Khẳng định phi quá khứ: の + ようだ",
          example: "今日は休みのようだ。",
        },
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
    {
      id: "g-15-06",
      pattern: "～はずだ",
      meaning: "Theo căn cứ đã biết thì chắc là / đáng lẽ…",
      chapter: "15B",
      explanation:
        "Diễn tả điều người nói suy ra một cách hợp lý từ thông tin hoặc căn cứ đã biết. Đây là sự suy luận hoặc kỳ vọng của người nói, không phải bảo đảm sự việc chắc chắn xảy ra. はずだった / はずだけど còn có thể thể hiện kết quả khác với dự kiến.",
      usage: [
        "Động từ và tính từ い dùng thể thường. Ở khẳng định phi quá khứ: danh từ + のはずだ; tính từ な + なはずだ.",
        "Quá khứ/phủ định của danh từ và tính từ な nối trực tiếp: 休みだったはずだ / 静かではないはずだ.",
        "はずだった thường nói điều được dự kiến ở quá khứ; 〜はずだけど có thể biểu thị điều thực tế không khớp với suy nghĩ. Khi luyện tập, hãy nêu căn cứ suy luận.",
      ],
      examples: [
        {
          jp: "あまり使わなかったから、きれいなはずです。",
          vi: "Vì không dùng nhiều nên chắc là nó còn đẹp.",
        },
        {
          jp: "駅で待っているはずだよ。さっきメールがあったから。",
          vi: "Chắc là cậu ấy đang đợi ở ga. Vì vừa có tin nhắn.",
        },
        {
          jp: "このレストランは有名だから、おいしいはずです。",
          vi: "Nhà hàng này nổi tiếng nên chắc là ngon.",
        },
        {
          jp: "田中さんは食堂にいるはずです。",
          vi: "Theo những gì đã biết thì anh/chị Tanaka chắc đang ở nhà ăn.",
        },
        {
          jp: "おかしいなぁ…。さっきここに置いたはずだけど…。めがねがない。",
          vi: "Lạ thật… rõ ràng vừa đặt ở đây… nhưng kính không thấy đâu.",
        },
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
          form: "Khẳng định phi quá khứ: な + はずだ",
          example: "あまり使っていないので、きれいなはずだ。",
        },
        {
          type: "Danh từ",
          form: "Khẳng định phi quá khứ: の + はずだ",
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
  ],
  referenceTables: [
    {
      title: "Thể thường của tính từ な · ví dụ 静か",
      rows: [
        {
          tense: "Phi quá khứ (hiện tại / tương lai)",
          type: "Khẳng định",
          polite: "静かです",
          plain: "静かだ",
        },
        {
          tense: "Phi quá khứ (hiện tại / tương lai)",
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
    },
    {
      title: "Thể thường của tính từ い · ví dụ 高い",
      rows: [
        {
          tense: "Phi quá khứ (hiện tại / tương lai)",
          type: "Khẳng định",
          polite: "高いです",
          plain: "高い",
        },
        {
          tense: "Phi quá khứ (hiện tại / tương lai)",
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
    },
    {
      title: "Thể thường của động từ · ví dụ 行く",
      rows: [
        {
          tense: "Phi quá khứ (hiện tại / tương lai)",
          type: "Khẳng định",
          polite: "行きます",
          plain: "行く",
        },
        {
          tense: "Phi quá khứ (hiện tại / tương lai)",
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
    {
      title: "Thể thường của danh từ · ví dụ 学生",
      rows: [
        {
          tense: "Phi quá khứ (hiện tại / tương lai)",
          type: "Khẳng định",
          polite: "学生です",
          plain: "学生だ",
        },
        {
          tense: "Phi quá khứ (hiện tại / tương lai)",
          type: "Phủ định",
          polite: "学生じゃないです",
          plain: "学生じゃない",
        },
        {
          tense: "Quá khứ",
          type: "Khẳng định",
          polite: "学生でした",
          plain: "学生だった",
        },
        {
          tense: "Quá khứ",
          type: "Phủ định",
          polite: "学生じゃなかったです",
          plain: "学生じゃなかった",
        },
      ],
    },
  ],
  passages: [
    {
      id: "weather",
      title: "Dự báo thời tiết",
      paragraphs: [
        "天気予報です。今日、東京は午前は曇りですが、午後から晴れて気温が上がるでしょう。大阪は曇りで、夕方には雨が降るかもしれません。気温も下がりますから、上着を忘れないでください。明日は東京は一日中晴れるでしょう。大阪は曇りですが、ときどき晴れるでしょう。",
      ],
      translation: [
        "Đây là dự báo thời tiết. Hôm nay, Tokyo có mây vào buổi sáng, nhưng từ buổi chiều trời sẽ nắng và nhiệt độ có lẽ sẽ tăng. Osaka có mây, chiều tối có thể có mưa. Nhiệt độ cũng sẽ giảm nên xin đừng quên áo khoác. Ngày mai Tokyo có lẽ sẽ nắng cả ngày. Osaka có mây, nhưng có lẽ thỉnh thoảng trời sẽ nắng.",
      ],
    },
    {
      id: "ramen",
      title: "Một quán ramen mới",
      paragraphs: [
        "私は昨日、友達と一緒に新しいラーメン屋に行きました。12時ごろに店に行って、びっくりしました。店の前には、たくさんの人が並んでいました。このラーメン屋は人気があるようでした。私たちも並んで待ちました。1時間ぐらい待って、13時ごろに店に入れました。",
        "メニューには、色々な種類のラーメンがありました。私はみそラーメンを食べました。友達はしょうゆラーメンを食べました。私はお腹がいっぱいになりましたが、友達は足りなかったようです。友達も味は好きだったようです。今度は、他のラーメンも食べたいです。",
      ],
      translation: [
        "Hôm qua tôi cùng bạn đến một quán ramen mới. Đến khoảng 12 giờ, tôi rất ngạc nhiên. Trước quán có nhiều người xếp hàng. Quán ramen này có vẻ được nhiều người ưa chuộng. Chúng tôi cũng xếp hàng chờ. Sau khi chờ khoảng một tiếng, khoảng 13 giờ chúng tôi mới vào được quán.",
        "Thực đơn có nhiều loại ramen. Tôi ăn ramen miso (tương đậu nành lên men), còn bạn ăn ramen shōyu (nước tương). Tôi đã no, nhưng có vẻ bạn tôi vẫn chưa ăn đủ. Có vẻ bạn tôi cũng thích hương vị của món ăn. Lần tới tôi muốn thử cả những loại ramen khác.",
      ],
    },
    {
      id: "movie",
      title: "Bốn nhận xét về một bộ phim",
      paragraphs: [
        "映画「ロック・スター」を見た４人のコメントです。",
        "るんるん（@runrun）：面白かった！ロックバンドの映画です。音楽がとてもいいです。ロック音楽が好きな人は、この映画も好きなはず！",
        "たくぞう（@taku1999）：「ロック・スター」、いい映画でした。でも、ちょっと話がつまらないかもしれません。隣の人は、途中から寝ていました…。音楽はよかったですよ。私は好きです。",
        "プーたろう（@puutaro.501）：この映画の歌手役の人、歌が上手いです。音楽もよかった。あまり有名じゃないみたいだけど、多分これから人気が出るでしょう。話は、少し難しかったなあ…。でも、つまらなくなかったですよ。",
        "米山（@yoneyama124）：ロック音楽に興味はないけど、好きな女優が出ていたから見に行った。やっぱり石田まり、かわいいなぁ。ロックはよくわからないけど、音楽も映画も楽しめた。話もまあまあ面白かったよ。",
      ],
      translation: [
        "Nhận xét của bốn người đã xem phim “Rock Star”.",
        "Runrun: Hay thật! Đây là phim về một ban nhạc rock. Nhạc rất hay. Người thích nhạc rock chắc cũng sẽ thích phim này!",
        "Takuzō: “Rock Star” là một bộ phim hay. Nhưng có lẽ cốt truyện hơi tẻ nhạt. Người ngồi cạnh tôi ngủ từ giữa phim… Nhạc thì hay đấy. Tôi thích.",
        "Pūtarō: Người đóng vai ca sĩ trong phim hát rất hay. Nhạc cũng hay. Có vẻ chưa nổi tiếng lắm, nhưng có lẽ sẽ được yêu thích từ nay. Cốt truyện hơi khó hiểu… Nhưng cũng không tẻ nhạt đâu.",
        "Yoneyama: Tôi không có hứng thú với nhạc rock, nhưng đi xem vì có nữ diễn viên tôi thích xuất hiện. Đúng là Ishida Mari dễ thương thật. Tôi không hiểu nhiều về rock, nhưng vẫn thưởng thức được cả nhạc lẫn phim. Cốt truyện cũng khá thú vị.",
      ],
    },
  ],
  questions: [
    {
      id: "q-v-01",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15A",
      prompt: "「台風」の読み方はどれですか。",
      options: ["たいふう", "だいふう", "たいふうう", "かぜ"],
      answer: "たいふう",
      explanation: "台風（たいふう）＝ cơn bão.",
    },
    {
      id: "q-v-02",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15A",
      prompt: "「厳しい」の意味はどれですか。",
      options: [
        "nghiêm khắc, khắt khe",
        "thân thiện",
        "dễ dàng",
        "nhanh chóng",
      ],
      answer: "nghiêm khắc, khắt khe",
      explanation: "厳しい（きびしい）＝ nghiêm khắc, khắt khe; gay gắt.",
    },
    {
      id: "q-v-03",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15A",
      prompt: "「成功する」の意味はどれですか。",
      options: ["thành công", "thất bại", "dừng lại", "trả lại"],
      answer: "thành công",
      explanation:
        "成功（せいこう）＝ thành công; 失敗（しっぱい）＝ thất bại.",
    },
    {
      id: "q-v-04",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15A",
      prompt: "「失敗する」の読み方はどれですか。",
      options: ["しっぱいする", "せいこうする", "ちゅうしする", "たのしむ"],
      answer: "しっぱいする",
      explanation: "失敗（しっぱい）する ＝ thất bại.",
    },
    {
      id: "q-v-05",
      category: "vocabulary",
      kind: "fill",
      chapter: "15A",
      prompt: "「楽しむ」の読み方をひらがなで書いてください。",
      answer: "たのしむ",
      explanation: "楽しむ（たのしむ）＝ tận hưởng, thưởng thức.",
    },
    {
      id: "q-v-06",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15A",
      prompt: "「返す」の意味はどれですか。",
      options: ["trả lại", "mượn", "nhận", "tặng"],
      answer: "trả lại",
      explanation: "返す（かえす）＝ trả lại.",
    },
    {
      id: "q-v-07",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15B",
      prompt: "「風邪」の読み方はどれですか。",
      options: ["かぜ", "かみなり", "るす", "じこ"],
      answer: "かぜ",
      explanation:
        "風邪（かぜ）＝ cảm lạnh. Trong bài này không dùng nghĩa bệnh cúm (インフルエンザ).",
    },
    {
      id: "q-v-08",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15B",
      prompt: "「救急車」の読み方はどれですか。",
      options: [
        "きゅうきゅうしゃ",
        "りょこうきゃく",
        "ゆうめいじん",
        "いりぐち",
      ],
      answer: "きゅうきゅうしゃ",
      explanation: "救急車（きゅうきゅうしゃ）＝ xe cấp cứu.",
    },
    {
      id: "q-v-09",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15B",
      prompt: "「留守」の意味はどれですか。",
      options: ["vắng nhà", "sấm sét", "tai nạn", "lối vào"],
      answer: "vắng nhà",
      explanation: "留守（るす）＝ vắng nhà.",
    },
    {
      id: "q-v-10",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15B",
      prompt: "「真っ暗」の読み方はどれですか。",
      options: ["まっくら", "まっくろ", "まくら", "まっすぐ"],
      answer: "まっくら",
      explanation: "真っ暗（まっくら）＝ tối om.",
    },
    {
      id: "q-v-11",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15B",
      prompt: "「同じ」はどのように使うのが正しいですか。",
      options: ["同じ人（không có な）", "同じな人", "同じだ人", "同じの人"],
      answer: "同じ人（không có な）",
      explanation:
        "「同じ」 là tính từ đặc biệt: kết hợp thẳng với danh từ mà không có 「な」, ví dụ 同じ人（おなじひと）.",
    },
    {
      id: "q-v-12",
      category: "vocabulary",
      kind: "mcq",
      chapter: "15B",
      prompt: "「届く」の意味はどれですか。",
      options: ["đến nơi; được chuyển tới", "tập trung", "va phải", "biến mất"],
      answer: "đến nơi; được chuyển tới",
      explanation:
        "届く（とどく）là tự động từ: đến nơi/được chuyển tới, như 手紙が届く (thư đến nơi).",
    },
    {
      id: "q-v-13",
      category: "vocabulary",
      kind: "fill",
      chapter: "15B",
      prompt: "Viết ngắn gọn nghĩa tiếng Việt của もしかしたら。",
      answer: "có lẽ|biết đâu|có lẽ, biết đâu",
      explanation:
        "もしかしたら ＝ có lẽ, biết đâu (thường đi với かもしれない).",
    },
    {
      id: "q-g-01",
      category: "grammar",
      kind: "mcq",
      chapter: "15A",
      prompt: "明日は雨が降る＿＿。",
      options: ["でしょう", "でした", "ます", "ました"],
      answer: "でしょう",
      explanation:
        "「～でしょう」 dùng để phán đoán: 明日は雨が降るでしょう。＝ Ngày mai chắc sẽ mưa.",
      targetIds: ["g-15-01"],
    },
    {
      id: "q-g-02",
      category: "grammar",
      kind: "mcq",
      chapter: "15A",
      prompt: "ダイエットは多分失敗する＿＿。",
      options: ["だろう", "です", "ました", "ます"],
      answer: "だろう",
      explanation:
        "「～だろう」 là thể thường của 「でしょう」: 多分失敗するだろう ＝ chắc sẽ thất bại.",
      targetIds: ["g-15-01"],
    },
    {
      id: "q-g-03",
      category: "grammar",
      kind: "mcq",
      chapter: "15B",
      prompt: "あの人はベトナム人＿＿。",
      options: ["かもしれません", "でしょうでした", "ですだ", "ました"],
      answer: "かもしれません",
      explanation:
        "「～かもしれない」 diễn tả khả năng: あの人はベトナム人かもしれません ＝ có lẽ người đó là người Việt Nam.",
      targetIds: ["g-15-03"],
    },
    {
      id: "q-g-04",
      category: "grammar",
      kind: "mcq",
      chapter: "15B",
      prompt: "店の前に人がたくさん並んでいます。人気がある＿＿ですね。",
      options: ["みたい", "はずでした", "ようだた", "ません"],
      answer: "みたい",
      explanation:
        "Nhiều người xếp hàng là dấu hiệu để suy đoán: 人気があるみたいですね (có vẻ quán được ưa chuộng). Điền みたい trước ですね.",
      targetIds: ["g-15-04"],
    },
    {
      id: "q-g-05",
      category: "grammar",
      kind: "mcq",
      chapter: "15B",
      prompt:
        "田中さんから「今、食堂で昼ご飯を食べています」とメッセージが来ました。田中さんは食堂にいる＿＿です。",
      options: ["はず", "こと", "つもり", "ため"],
      answer: "はず",
      explanation:
        "Tin nhắn là căn cứ để suy ra Tanaka đang ở nhà ăn. Vì vậy dùng いるはずです. はず diễn tả suy luận từ thông tin đã biết.",
      targetIds: ["g-15-06"],
      optionExplanations: {
        こと: "いることです không diễn tả suy luận dựa trên tin nhắn trong tình huống này.",
        つもり:
          "つもり diễn tả dự định; tin nhắn cho biết hành động đang xảy ra.",
        ため: "ため diễn tả mục đích hoặc nguyên nhân, không diễn tả suy luận này.",
      },
    },
    {
      id: "q-g-06",
      category: "grammar",
      kind: "mcq",
      chapter: "15B",
      prompt:
        "（Văn viết / báo cáo）バスは1日に5本しかなかった。この町はだいぶ不便な＿＿。",
      options: ["ようだ", "みたいでした", "だろうか", "はず"],
      answer: "ようだ",
      explanation:
        "不便 là tính từ な, dùng 不便なようだ. ようだ diễn tả suy đoán từ tình hình, thường trung tính/trang trọng hơn みたいだ; vẫn dùng được trong hội thoại. Dạng lịch sự là ようです.",
      targetIds: ["g-15-05"],
    },
    {
      id: "q-g-07",
      category: "grammar",
      kind: "mcq",
      chapter: "15B",
      prompt:
        "Dùng はず để nói điều thực tế khác với suy nghĩ: おかしいなぁ…。さっきここに置いた＿＿だけど…。めがねがない。",
      options: ["はず", "はずの", "はずな", "はずだ"],
      answer: "はず",
      explanation:
        "Dùng 置いたはずだけど: tôi nhớ/cứ nghĩ đã đặt ở đây nhưng thực tế không thấy kính. Trước だけど chỉ cần はず, không thêm の / な / だ.",
      targetIds: ["g-15-06"],
    },
    {
      id: "q-g-08",
      category: "grammar",
      kind: "mcq",
      chapter: "15A",
      prompt:
        "Người nói đang cho bạn xem chiếc túi và muốn bạn đồng tình. 「このかばん、かわいいでしょう？」trong tình huống này nghĩa là gì?",
      options: [
        "Chiếc cặp này dễ thương đúng không?",
        "Chiếc cặp này không dễ thương.",
        "Chiếc cặp này có lẽ dễ thương.",
        "Chiếc cặp này chắc chắn dễ thương.",
      ],
      answer: "Chiếc cặp này dễ thương đúng không?",
      explanation:
        "Trong bối cảnh muốn người nghe đồng tình và ngữ điệu hỏi xác nhận, でしょう？ nghĩa là “đúng không?”. Dấu hỏi riêng lẻ không đủ để quyết định mọi cách dùng của でしょう.",
      targetIds: ["g-15-02"],
    },
    {
      id: "q-k-01",
      category: "kanji",
      kind: "mcq",
      chapter: "15.1",
      prompt: "「力」の音読みはどれですか。",
      options: ["リョク・リキ", "ドウ", "チ", "ケツ"],
      answer: "リョク・リキ",
      explanation: "力: 訓読み ちから, 音読み リョク・リキ.",
    },
    {
      id: "q-k-02",
      category: "kanji",
      kind: "mcq",
      chapter: "15.1",
      prompt: "「運動」の読み方はどれですか。",
      options: ["うんどう", "じどう", "どうが", "かんどう"],
      answer: "うんどう",
      explanation: "運動（うんどう）＝ vận động, thể dục.",
    },
    {
      id: "q-k-03",
      category: "kanji",
      kind: "mcq",
      chapter: "15.1",
      prompt: "「働く」の読み方はどれですか。",
      options: ["はたらく", "うごく", "やすむ", "つとめる"],
      answer: "はたらく",
      explanation: "働く（はたらく）＝ làm việc.",
    },
    {
      id: "q-k-04",
      category: "kanji",
      kind: "mcq",
      chapter: "15.2",
      prompt: "「知」の音読みはどれですか。",
      options: ["チ", "イ", "タン", "ケツ"],
      answer: "チ",
      explanation: "知: 訓読み し・る, 音読み チ.",
    },
    {
      id: "q-k-05",
      category: "kanji",
      kind: "mcq",
      chapter: "15.2",
      prompt: "「医者」の読み方はどれですか。",
      options: ["いしゃ", "はいしゃ", "いがく", "おさら"],
      answer: "いしゃ",
      explanation: "医者（いしゃ）＝ bác sĩ; 歯医者（はいしゃ）＝ nha sĩ.",
    },
    {
      id: "q-k-06",
      category: "kanji",
      kind: "mcq",
      chapter: "15.2",
      prompt: "「短い」の読み方はどれですか。",
      options: ["みじかい", "たんき", "ながい", "ちかい"],
      answer: "みじかい",
      explanation: "短い（みじかい）＝ ngắn.",
    },
    {
      id: "q-k-07",
      category: "kanji",
      kind: "mcq",
      chapter: "15.3",
      prompt: "「血」の読み方（訓読み）はどれですか。",
      options: ["ち", "さら", "けつ", "き"],
      answer: "ち",
      explanation: "血: 訓読み ち, 音読み ケツ.",
    },
    {
      id: "q-r-01",
      category: "reading",
      kind: "mcq",
      chapter: "15",
      prompt: "今日、大阪の天気はどうですか。",
      options: [
        "曇りで、夕方に雨が降るかもしれません。",
        "一日中晴れます。",
        "一日中雨です。",
        "雪が降ります。",
      ],
      answer: "曇りで、夕方に雨が降るかもしれません。",
      explanation:
        "Hỏi thời tiết hôm nay tại Osaka: 大阪は曇り và 夕方には雨が降るかもしれません, tức có mây và chiều tối có thể có mưa. Thông tin trời nắng cả ngày là dự báo cho Tokyo ngày mai, không phải Osaka hôm nay.",
      passageId: "weather",
    },
    {
      id: "q-r-02",
      category: "reading",
      kind: "mcq",
      chapter: "15",
      prompt: "正しい文はどれですか。",
      options: [
        "ラーメン屋の前にたくさんの人が並んでいました。",
        "ラーメン屋は空いていました。",
        "私は一人でラーメン屋に行きました。",
        "ラーメン屋は閉まっていました。",
      ],
      answer: "ラーメン屋の前にたくさんの人が並んでいました。",
      explanation:
        "Câu 店の前には、たくさんの人が並んでいました cho biết nhiều người xếp hàng trước quán. Người kể đi cùng bạn (友達と一緒に), nên lựa chọn đi một mình cũng sai.",
      passageId: "ramen",
    },
    {
      id: "q-r-03",
      category: "reading",
      kind: "mcq",
      chapter: "15",
      prompt: "４人のコメントで、みんながよかったと言っているものは何ですか。",
      options: [
        "音楽がよかった",
        "話がつまらなかった",
        "女優が好き",
        "ロック音楽が好き",
      ],
      answer: "音楽がよかった",
      explanation:
        "Cả bốn người đều đánh giá tốt âm nhạc. Runrun: 音楽がとてもいい; Takuzō: 音楽はよかった; Pūtarō: 音楽もよかった; Yoneyama: 音楽も映画も楽しめた. Ý kiến về cốt truyện, nữ diễn viên hoặc sở thích nhạc rock không giống nhau.",
      passageId: "movie",
    },
    {
      id: "q-r-04",
      category: "reading",
      kind: "fill",
      chapter: "15",
      prompt: "映画の名前は何ですか。（カタカナで答えてください）",
      answer: "ロック・スター|ロックスター",
      explanation:
        "Tên phim ở ngay câu đầu: 映画「ロック・スター」. Chấp nhận cả ロック・スター và ロックスター; khi viết tiếng Nhật hãy dùng katakana cho tên này.",
      passageId: "movie",
    },
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
        "Dùng かもしれません hoặc かもしれない để nói: “Người đó có lẽ là sinh viên.” Điền phần còn thiếu: あの人は学生＿＿。",
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
