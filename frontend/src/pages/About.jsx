import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-5xl font-extrabold text-gray-800" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
          >
            Về Chúng Tôi
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
          >
            Chào mừng bạn đến với nền tảng hàng đầu về mua bán xe hơi, nơi cung cấp những chiếc xe chất lượng nhất với mức giá tốt nhất!
          </motion.p>
        </div>

        {/* Nội dung giới thiệu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Hình ảnh */}
          <motion.img
            src="/bmw.jpeg"
            alt="Giới thiệu"
            className="rounded-lg shadow-lg w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />

          {/* Văn bản */}
          <div>
            <motion.h2 
              className="text-3xl font-semibold text-gray-800" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, delay: 1.5 }}
            >
              Sứ mệnh của chúng tôi
            </motion.h2>
            <motion.p 
              className="text-gray-600 mt-4 leading-relaxed" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, delay: 2 }}
            >
              Chúng tôi cam kết mang đến trải nghiệm mua sắm xe hơi tiện lợi, an toàn và đáng tin cậy nhất.
              Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi không ngừng cập nhật các mẫu xe hiện đại,
              phù hợp với nhu cầu của khách hàng.
            </motion.p>
            <motion.button 
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, delay: 2.5 }}
            >
              Tìm hiểu thêm
            </motion.button>
          </div>
        </div>

        {/* Phần về chúng tôi */}
        <div className="mt-20 text-center">
          <motion.h2 
            className="text-4xl font-semibold text-gray-800" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 3 }}
          >
            Cam kết chất lượng và dịch vụ
          </motion.h2>
          <motion.p 
            className="text-gray-600 mt-3 max-w-3xl mx-auto" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 3.5 }}
          >
            Chúng tôi không chỉ cung cấp những chiếc xe hơi chất lượng mà còn cam kết mang đến trải nghiệm dịch vụ tuyệt vời, từ việc tư vấn đến việc giao xe tận tay.
          </motion.p>

          <motion.div
            className="mt-12 bg-gray-200 p-10 rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800">Chất lượng vượt trội</h3>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Mỗi chiếc xe của chúng tôi đều được kiểm tra kỹ lưỡng về chất lượng và độ an toàn trước khi đến tay khách hàng. Bạn hoàn toàn có thể yên tâm khi mua xe tại đây.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
