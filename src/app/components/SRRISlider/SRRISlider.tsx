export const SRRISlider = ({ srri }: { srri: number }) => {
  const boxCount = 10;

  const getColor = (index: number) => {
    const ratio = index / (boxCount - 1); // Normalize the index to range from 0 to 1
    const red = Math.floor(255 * ratio);
    const green = Math.floor(255 * (1 - ratio));
    return `rgb(${red}, ${green}, 0)`;
  };

  if (!srri) {
    return <div>No SRRI provided</div>;
  }

  return (
    <div className="flex items-center mt-2">
      {[...Array(boxCount)].map((_, index) => (
        <div
          key={index}
          className={`w-6 h-6 mx-1 rounded-sm 
                ${index < srri ? 'border border-gray-700' : ''} 
                ${index === srri - 1 ? 'border-4 border-black' : ''}`}
          style={{ backgroundColor: getColor(index) }}
        ></div>
      ))}
      <span className="ml-4 text-sm">Risk Level: {srri}/10</span>
    </div>
  );
};
