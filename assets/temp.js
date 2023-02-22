let result = [
  [
    {title: 'Toàn bộ câu hỏi', icon: 'target', index: 8 + 1},
    {title: 'Câu hỏi điểm liệt', icon: 'fire', index: 9 + 1},
    {title: 'Khái niệm và quy tắc', icon: 'light', index: 10 + 1},
    {title: 'Văn hóa và đạo đức', icon: 'human', index: 11 + 1},
    {title: 'Kỹ thuật lái xe', icon: 'car', index: 12 + 1},
    {title: 'Biển báo đường bộ', icon: 'sign', index: 13 + 1},
    {title: 'Sa hình', icon: 'barrier', index: 14 + 1},
  ],
  [
    {title: 'Toàn bộ câu hỏi', icon: 'target', index: 18 + 1},
    {title: 'Câu hỏi điểm liệt', icon: 'fire', index: 19 + 1},
    {title: 'Khái niệm và quy tắc', icon: 'light', index: 20 + 1},
    {title: 'Văn hóa và đạo đức', icon: 'human', index: 21 + 1},
    {title: 'Kỹ thuật lái xe', icon: 'car', index: 22 + 1},
    {title: 'Cấu tạo và sửa chữa', icon: 'repair', index: 23 + 1},
    {title: 'Biển báo đường bộ', icon: 'sign', index: 24 + 1},
    {title: 'Sa hình', icon: 'barrier', index: 25 + 1},
  ],
  [
    {title: 'Toàn bộ câu hỏi', icon: 'target', index: 20 + 1},
    {title: 'Câu hỏi điểm liệt', icon: 'fire', index: 21 + 1},
    {title: 'Khái niệm và quy tắc', icon: 'light', index: 22 + 1},
    {title: 'Văn hóa và đạo đức', icon: 'human', index: 23 + 1},
    {title: 'Kỹ thuật lái xe', icon: 'car', index: 24 + 1},
    {title: 'Biển báo đường bộ', icon: 'sign', index: 25 + 1},
    {title: 'Sa hình', icon: 'barrier', index: 26 + 1},
  ],
  [
    {title: 'Toàn bộ câu hỏi', icon: 'target', index: 20 + 1},
    {title: 'Câu hỏi điểm liệt', icon: 'fire', index: 21 + 1},
    {title: 'Khái niệm và quy tắc', icon: 'light', index: 22 + 1},
    {title: 'Văn hóa và đạo đức', icon: 'human', index: 23 + 1},
    {title: 'Kỹ thuật lái xe', icon: 'car', index: 24 + 1},
    {title: 'Cấu tạo và sửa chữa', icon: 'repair', index: 25 + 1},
    {title: 'Biển báo đường bộ', icon: 'sign', index: 26 + 1},
    {title: 'Sa hình', icon: 'barrier', index: 27 + 1},
  ],
  [
    {title: 'Toàn bộ câu hỏi', icon: 'target', index: 18 + 1},
    {title: 'Câu hỏi điểm liệt', icon: 'fire', index: 19 + 1},
    {title: 'Khái niệm và quy tắc', icon: 'light', index: 20 + 1},
    {title: 'Nghiệp vụ vận tải', icon: 'truck', index: 21 + 1},
    {title: 'Văn hóa và đạo đức', icon: 'human', index: 22 + 1},
    {title: 'Kỹ thuật lái xe', icon: 'car', index: 23 + 1},
    {title: 'Cấu tạo và sửa chữa', icon: 'repair', index: 24 + 1},
    {title: 'Biển báo đường bộ', icon: 'sign', index: 25 + 1},
    {title: 'Sa hình', icon: 'barrier', index: 26 + 1},
  ],
  [
    {title: 'Toàn bộ câu hỏi', icon: 'target', index: 15 + 1},
    {title: 'Câu hỏi điểm liệt', icon: 'fire', index: 16 + 1},
    {title: 'Khái niệm và quy tắc', icon: 'light', index: 17 + 1},
    {title: 'Nghiệp vụ vận tải', icon: 'truck', index: 18 + 1},
    {title: 'Văn hóa và đạo đức', icon: 'human', index: 19 + 1},
    {title: 'Kỹ thuật lái xe', icon: 'car', index: 20 + 1},
    {title: 'Cấu tạo và sửa chữa', icon: 'repair', index: 21 + 1},
    {title: 'Biển báo đường bộ', icon: 'sign', index: 22 + 1},
    {title: 'Sa hình', icon: 'barrier', index: 23 + 1},
  ],
  [
    {title: 'Toàn bộ câu hỏi', icon: 'target', index: 14 + 1},
    {title: 'Câu hỏi điểm liệt', icon: 'fire', index: 15 + 1},
    {title: 'Khái niệm và quy tắc', icon: 'light', index: 16 + 1},
    {title: 'Nghiệp vụ vận tải', icon: 'truck', index: 17 + 1},
    {title: 'Văn hóa và đạo đức', icon: 'human', index: 18 + 1},
    {title: 'Kỹ thuật lái xe', icon: 'car', index: 19 + 1},
    {title: 'Cấu tạo và sửa chữa', icon: 'repair', index: 20 + 1},
    {title: 'Biển báo đường bộ', icon: 'sign', index: 21 + 1},
    {title: 'Sa hình', icon: 'barrier', index: 22 + 1},
  ],
];

const fs = require('fs');

fs.writeFile('./reviewTopics.json', JSON.stringify(result), err => {
  if (err) {
    console.error(err);
  }
});
