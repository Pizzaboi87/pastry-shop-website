import { Image, Paragraphs } from ".";
import { textImageStyle } from "../styles";

const TextAndImage = ({ dirPic, dirText, image, imgFirst, text, flexDir }) => {
  return (
    <div className={`${flexDir} ${textImageStyle.wrapper}`}>
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
