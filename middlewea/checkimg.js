const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/upload/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
    // Chấp nhận file nếu là ảnh, từ chối nếu không phải
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true);
    } else {
      // Từ chối file, không upload
      cb(new Error('File phải là ảnh!'), false);
    }
  };
  
  // Cấu hình upload với multer
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5 // Giới hạn kích thước file là 5MB
    },
    fileFilter: fileFilter
  });

module.exports={
     handleMulterError : (err, req, res, next) => {
        if (err instanceof multer.MulterError || err) {
          // Trả về thông báo lỗi nếu có lỗi trong quá trình upload file
          return res.status(400).send({
            success: false,
            message: err.message || 'Đã có lỗi xảy ra trong quá trình tải file lên!'
          });
        }
        next(); // Chuyển tiếp tới middleware tiếp theo nếu không có lỗi
      },
      checkImageSize:(req, res, next) => {
        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: 'Không có file nào được tải lên!'
          });
        }
      
        try {
          const dimensions = sizeOf(req.file.buffer);
          const width = dimensions.width;
          const height = dimensions.height;
      
          if (width > 2000 || height > 2000) {
            return res.status(400).json({
              success: false,
              message: 'Kích thước ảnh quá lớn! Yêu cầu ảnh không lớn hơn 2000x2000.'
            });
          }
      
          req.imageDimensions = { width, height };
          next();
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: 'Lỗi khi đọc kích thước ảnh!'
          });
        }
      }
      
}