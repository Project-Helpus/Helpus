import imageCompression from "browser-image-compression";

export const compressImage = (imageFile) => {
  const compressImageHandler = async (imageFile) => {
    const options = {
      maxSizeMB: 1, // 이미지 최대 용량
      maxWidthOrHeight: 500, // 최대 넓이(혹은 높이)
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      alert("다시 시도 해주세요.");
    }
  };
  const compressedFile = compressImageHandler(imageFile);
  return compressedFile;
};
