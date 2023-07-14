import { Image, Paragraphs } from ".";

const TextAndImage = ({ dirPic, dirText, image, imgFirst, text, width }) => {
  return (
    <div className="w-[85%] flex items-center justify-center mt-36 3xl:mt-56">
      {imgFirst ? (
        <>
          <Image
            dirPic={dirPic}
            image={image}
            imgFirst={imgFirst}
            width={width}
          />
          <Paragraphs dirText={dirText} imgFirst={imgFirst} text={text} />
        </>
      ) : (
        <>
          <Paragraphs dirText={dirText} imgFirst={imgFirst} text={text} />
          <Image
            dirPic={dirPic}
            image={image}
            imgFirst={imgFirst}
            width={width}
          />
        </>
      )}
    </div>
  );
};

export default TextAndImage;
