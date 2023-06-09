import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

export function AboutPage(){
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Черный фон с прозрачностью 0.8
      }}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url("https://s0.rbk.ru/v6_top_pics/media/img/0/44/756603044119440.jpg")`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.2, // Прозрачность фото (от 0 до 1)
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="container py-5"
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1 className="mb-4 text-white">About Us</h1>
        <div className="row">
          <div className="col-lg-6">
            <div className="card bg-dark">
              <div className="card-body">
                <h5 className="card-title text-white">Our team</h5>
                <p className="card-text text-white">
                We are a team of professionals in the construction industry with many years of experience.
                Our goal is to create reliable and high-quality construction projects that meet the needs of our customers.</p>
              </div>
            </div>
            <div className="card bg-dark mt-3">
              <div className="card-body">
                <h5 className="card-title text-white">Our services</h5>
                <p className="card-text text-white">
                We offer a wide range of services, including residential and commercial construction, renovations,
                architectural design and much more. We guarantee high quality and attention to detail in every project.</p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-white">
        Contact us to discuss your next project and turn your dreams into reality!        </p>
        <p className="text-white">С уважением,</p>
        <p className="text-white">Команда вашей строительной компании</p>
      </motion.div>
    </div>
  );
}
