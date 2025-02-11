import './spinner.css';

const LoadingSpinner = ({
  loadingText,
  textColorClass,
  spinnerColor,
}: {
  loadingText?: string;
  textColorClass?: string;
  spinnerColor?: string;
}) => {
  return (
    <div
      className="flex h-52 flex-row items-center justify-center p-3"
      role="status"
      aria-live="polite"
    >
      <div
        className="lds-ring"
        style={
          {
            '--spinner-color': spinnerColor || 'rgb(6, 88, 254)',
          } as React.CSSProperties
        }
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span
        className={`ml-2 ${textColorClass || 'text-white'}`}
        data-testid="loading-spinner"
      >
        {loadingText || 'Loading...'}
      </span>
    </div>
  );
};

export default LoadingSpinner;
