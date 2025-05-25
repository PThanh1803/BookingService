const CategoryCard = ({ name, image }) => {
  return (
    <div className="relative group cursor-pointer">
      {/* Background with gradient overlay */}
      <div className="relative md:h-36 md:w-52 h-28 w-40 rounded-xl   overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Service Name */}
      <div className="absolute top-0 left-2 right-0 p-4 z-20 max-w-[100px] ">
        { name &&
          <div className="">
            <h3 className="text-gray-700 text-base font-serif font-bold">{name}</h3>
          </div>
        }

      </div>
    </div>
  );
};

export default CategoryCard; 