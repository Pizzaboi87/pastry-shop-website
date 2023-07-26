import { Image, Paragraphs } from ".";

const TextAndImage = ({ dirPic, dirText, image, imgFirst, text, flexDir }) => {
  return (
    <div
      className={`${flexDir} w-full flex 2xl:flex-row flex-col items-center justify-center 2xl:mt-36 3xl:mt-56 mt-6`}
    >
      {imgFirst ? (
        <>
          <Image dirPic={dirPic} image={image} imgFirst={imgFirst} />
          <Paragraphs dirText={dirText} imgFirst={imgFirst} text={text} />
        </>
      ) : (
        <>
          <Paragraphs dirText={dirText} imgFirst={imgFirst} text={text} />
          <Image dirPic={dirPic} image={image} imgFirst={imgFirst} />
        </>
      )}
    </div>
  );
};

export default TextAndImage;
