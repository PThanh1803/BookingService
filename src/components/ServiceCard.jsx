

const ServiceCard = ({ title , image }) => {
  return (
    <div className="relative group cursor-pointer">
      {/* Background with gradient overlay */}
      <div className="relative md:h-72 md:w-52 h-56 w-40 rounded-2xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Service Name */}
      <div className="absolute top-0 left-2 right-0 p-4 z-20">
        { title &&
          <div className="max-w-[100px] ">
            <h3 className="text-gray-800 text-xl font-semibold font-serif">{title}</h3>
          </div>
        }
      </div>
    </div>
  );
};

export default ServiceCard; 