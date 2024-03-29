import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imageCompression from 'browser-image-compression';
import { ImgsSizeArithmetic } from "./sizeUtils";

// common Upload image
export const uploadImage = async (folder: string, weekDate: string, imgs: Array<File>) => {
    const imageUrlPromises: Promise<string>[] = [];
    const allowedExtensions = ['.jpg', '.png', '.jpeg'];
    const fileExtension = imgs.map((e: { name: string; }) => e.name.substring(e.name.lastIndexOf('.')).toLowerCase());
    const options = { 
        maxSizeMB: 600, 
        maxWidthOrHeight: 1200
    }

    for (const e of fileExtension) {
        if (!allowedExtensions.includes(e)) {
            return alert('확장자는 jpg, png, jpeg만 지원합니다.');
        }
    }

    for (let i = 0; i < imgs.length; i++) {
        const image = await imageCompression(imgs[i], options);
        const storageRef = ref(storage, `${folder}/${weekDate}_${i}.png`);
        
        try {
            await uploadBytes(storageRef, image);
            const imageUrlPromise = getDownloadURL(storageRef);
            imageUrlPromises.push(imageUrlPromise);
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('이미지 업로드 중 오류가 발생했습니다.');
        }
    }

    const imageUrls = await Promise.all(imageUrlPromises);
    return imageUrls;
};

// common delete image
export const DeleteImages = async (imageUrls: Array<string>) => {
    if (imageUrls && imageUrls.length > 0) {
        imageUrls.forEach(async (imageUrl) => {
            const storageRef = ref(storage, imageUrl);
            await ImgsSizeArithmetic(storageRef, "-");
        });
    }
};