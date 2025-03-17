import {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Upload, Avatar, Badge, Button, Typography, message } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import styles from './ImagePicker.module.css';

interface ImagePickerProps {
  value?: string;
  onUpload: (file: File | null) => Promise<string | undefined>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const validateImage = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    return { success: false, message: 'You can only upload JPG/PNG files!' };
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return { success: false, message: 'Image must be smaller than 2MB!' };
  }
  return { success: true, message: '' };
};

const ImagePicker = forwardRef<HTMLInputElement, ImagePickerProps>(
  ({ value, onUpload, onChange }: ImagePickerProps, forwardedRef) => {
    const ref = useRef<HTMLInputElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);

    const [image, setImage] = useState<string | null>(() => value || null);
    const [error, setError] = useState<string | null>(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleUploadClick = async (file: File) => {
      if (!file) {
        message.error('No file selected');
        return false;
      }

      const validationResult = validateImage(file);
      if (!validationResult.success) {
        setError(validationResult.message);
        message.error(validationResult.message);
        return false;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        setImage(reader.result as string);
        try {
          const data = await onUpload(file);
          if (!data) {
            message.error('Upload failed, please try again');
            setImage(null);
            return;
          }
          setError(null);
          onChange({
            target: { value: data },
          } as ChangeEvent<HTMLInputElement>);
          message.success('Upload successfully!');
        } catch (err) {
          message.error('Upload failed, please try again');
          setImage(null);
        }
      };

      return false; // Prevent default upload behavior
    };

    const handleDelete = async () => {
      try {
        const data = await onUpload(null);
        if (typeof data === 'undefined') {
          message.error('Delete failed, please try again');
          return;
        }
        setImage(null);
        onChange({ target: { value: data } } as ChangeEvent<HTMLInputElement>);
        setError(null);
        message.success('Delete successfully!');
      } catch (err) {
        message.error('Delete failed, please try again');
      }
    };

    const handleClick = () => {
      ref.current?.click();
    };

    const showMenu = () => {
      setIsMenuVisible(true);
    };

    const hideMenu = () => {
      setIsMenuVisible(false);
    };

    return (
      <div className={styles.container}>
        <Badge
          count={
            <div className={styles.editBadge}>
              <EditOutlined onClick={showMenu} />
            </div>
          }
          offset={[-10, 10]}
        >
          <div
            className={styles.avatarContainer}
            onMouseEnter={showMenu}
            onMouseLeave={hideMenu}
          >
            <Avatar
              size={200}
              src={image || '/broken-image.jpg'}
              className={styles.avatar}
            />

            {isMenuVisible && (
              <div className={styles.menuOverlay}>
                <div className={styles.menuContent}>
                  <Button
                    type="text"
                    icon={<UploadOutlined />}
                    className={styles.menuButton}
                    onClick={handleClick}
                  >
                    Upload
                  </Button>
                  {image && (
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      className={styles.menuButton}
                      onClick={handleDelete}
                      danger
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Badge>

        <input
          type="file"
          ref={ref}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleUploadClick(file);
            }
          }}
          accept="image/jpeg,image/png"
          style={{ display: 'none' }}
        />

        {error && (
          <Typography.Text type="danger" className={styles.errorText}>
            {error}
          </Typography.Text>
        )}
      </div>
    );
  },
);

export default ImagePicker;
