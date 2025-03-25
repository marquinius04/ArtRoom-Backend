import "./LogosYoutubeIcon.css";

export const LogosYoutubeIcon = ({ className, ...props }) => {
  return (
    <img
      className={"logos-youtube-icon " + className}
      src="logos-youtube-icon.svg"
    />
  );
};
