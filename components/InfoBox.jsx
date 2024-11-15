export default function InfoBox({
  heading,
  backgroundColor = 'bg-white',
  textColor = 'text-black',
  children,
  buttonInfo,
}) {
  return (
    <>
      <div className={`${backgroundColor} p-6 rounded-lg shadow-lg`}>
        {' '}
        <h2 className={`${textColor} text-3xl font-semibold`}>
          {heading}
        </h2>{' '}
        <p className={`${textColor} mt-4 mb-6`}>{children}</p>{' '}
        <a
          href={buttonInfo.link}
          className={`${buttonInfo.backgroundColor} inline-block text-white rounded-full px-6 py-3 hover:bg-opacity-75`}
        >
          {buttonInfo.text}
        </a>
      </div>
    </>
  );
}
