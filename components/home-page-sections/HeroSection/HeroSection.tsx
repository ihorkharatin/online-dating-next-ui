import style from "./HeroSection.module.css";
import SignInForm from "./SignInForm/SignInForm";
import VideoGallery from "./VideoGallery/VideoGallery";

const HeroSection = ({}) => {
  return (
    <div className={style.heroContainer}>
      <div className={style.signInContainer}>
        <SignInForm />
      </div>
      <div className={style.videoGalleryContainer}>
        <VideoGallery />
      </div>
    </div>
  );
};

export default HeroSection;
