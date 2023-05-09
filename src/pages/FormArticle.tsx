import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NavBar from '../components/NavBar';

import '../style/form_article.scss';
import axios from 'axios';

type FormData = {
  articleTitle: string;
  articlePerex: string;
  articleImage: File;
  articleContent: string;
};

const FormArticle = () => {
  const navigate = useNavigate();
  const { idArticle } = useParams<{ idArticle: string }>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>('');
  const [perex, setPerex] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | Blob>();
  const [content, setContent] = useState<string>('');
  const [imageId, setImageId] = useState<string>('');
  const [urlImage, setUrlImage] = useState<string>('');
  const [imageWasUploaded, setImageWasUploaded] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const publicArticle = async (data: any) => {
    console.log(data);

    const articleData = {
      title,
      perex,
      content,
      imageId,
    };

    try {
      if (!idArticle) {
        await axios.post(
          'https://fullstack.exercise.applifting.cz/articles',
          articleData,
          {
            headers: {
              'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
              Authorization: localStorage.getItem('access_token'),
            },
          }
        );
      } else {
        const response = await axios.patch(
          `https://fullstack.exercise.applifting.cz/articles/${idArticle}`,
          articleData,
          {
            headers: {
              'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
              Authorization: localStorage.getItem('access_token'),
            },
          }
        );
      }

      navigate('/');
    } catch (err: any) {
      console.log(err);

      if (err.response.status === 400) {
        setError('articleImage', {
          type: 'filetype',
          message: 'Upload your image.',
        });
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type != 'image/jpeg' && file.type != 'image/png') {
        setError('articleImage', {
          type: 'filetype',
          message: 'Only jpeg or png are valid.',
        });
        return;
      } else {
        setError('articleImage', {
          type: 'filetype',
          message: '',
        });
      }
    }
    setUploadedImage(file);
  };

  const handleUploadImage = async () => {
    const imageData = new FormData();
    if (uploadedImage) {
      imageData.append('image', uploadedImage);
    }

    try {
      const response = await axios.post(
        'https://fullstack.exercise.applifting.cz/images',
        imageData,
        {
          headers: {
            'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
            Authorization: localStorage.getItem('access_token'),
          },
        }
      );

      setImageId(response.data[0].imageId);
      setImageWasUploaded(true);
    } catch (err: any) {
      console.log(err);

      if (err.code === 'ERR_NETWORK') {
        setError('articleImage', {
          type: 'filetype',
          message: 'Max size image is 1Mb.',
        });
      }
    }
  };

  const handleDownloadImage = async () => {
    try {
      const response = await axios.get(
        `https://fullstack.exercise.applifting.cz/images/${imageId}`,
        {
          headers: {
            'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
            Authorization: localStorage.getItem('access_token'),
          },
          responseType: 'blob',
        }
      );

      const localUrl = URL.createObjectURL(response.data);
      setUrlImage(localUrl);
    } catch (err: any) {
      console.log(err);
    }
  };

  const hendleDleteImage = async () => {
    try {
      await axios.delete(
        `https://fullstack.exercise.applifting.cz/images/${imageId}`,
        {
          headers: {
            'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
            Authorization: localStorage.getItem('access_token'),
          },
        }
      );
      setImageId('');
      setUrlImage('');
      setImageWasUploaded(false);
      setUploadedImage('');
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (idArticle) {
      const getArticle = async () => {
        try {
          const response = await axios.get(
            `https://fullstack.exercise.applifting.cz/articles/${idArticle}`,
            {
              headers: {
                'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
                Authorization: localStorage.getItem('access_token'),
              },
            }
          );
          setTitle(response.data.title);
          setPerex(response.data.perex);
          setContent(response.data.content);
          setImageId(response.data.imageId);
          setImageWasUploaded(true);

          const responseImage = await axios.get(
            `https://fullstack.exercise.applifting.cz/images/${response.data.imageId}`,
            {
              headers: {
                'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
                Authorization: localStorage.getItem('access_token'),
              },
              responseType: 'blob',
            }
          );

          const localUrl = URL.createObjectURL(responseImage.data);
          setUrlImage(localUrl);
        } catch (err: any) {
          console.log(err);
        }
      };
      getArticle();
    }
  }, []);

  useEffect(() => {
    async function getImage() {
      if (uploadedImage) {
        await handleUploadImage();
      }
    }
    getImage();
  }, [uploadedImage]);

  useEffect(() => {
    async function fetchData() {
      if (uploadedImage) {
        await handleDownloadImage();
      }
    }
    fetchData();
  }, [imageId]);

  return (
    <>
      <NavBar />
      <main className="form-article">
        <form onSubmit={handleSubmit(publicArticle)}>
          <div className="header-form">
            <h1>Create new article</h1>
            <button className="submit-btn">Publish Article</button>
          </div>

          <label htmlFor="articleTitle">
            <i>Article Title</i>
            <input
              type="text"
              id="articleTitle"
              {...register('articleTitle', { required: true })}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              maxLength={50}
            />
            {errors.articleTitle && <p className="error">Enter your title.</p>}
          </label>

          <label htmlFor="articlePerex">
            <i>Article Perex</i>
            <input
              type="text"
              id="articlePerex"
              {...register('articlePerex', { required: true })}
              onChange={(e) => setPerex(e.target.value)}
              value={perex}
              maxLength={230}
            />
            {errors.articlePerex && <p className="error">Enter your perex.</p>}
          </label>

          <label style={{width: '180px'}} htmlFor="articleImage">
            <i>Featured Image</i>
            <input
              type="file"
              id="articleImage"
              {...register('articleImage')}
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            {!imageWasUploaded && (
              <button
                type="button"
                className="upload-btn"
                onClick={handleClick}
              >
                Upload an Image
              </button>
            )}
            {errors.articleImage && (
              <p className="error">{errors.articleImage?.message}</p>
            )}
            {imageWasUploaded && (
              <div className="uploaded-image">
                <img className="preview-image" src={urlImage}></img>
                <br />
                <div className="uploaded-image-btn">
                  <button
                    type="button"
                    className="reupload-btn"
                    onClick={handleClick}
                  >
                    Upload new
                  </button>
                  <span style={{ color: '#DFDFDF' }}>|</span>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={hendleDleteImage}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </label>

          <label htmlFor="articleContent">
            <i>Article Content</i>
            <textarea
              id="articleContent"
              {...register('articleContent', { required: true })}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            {errors.articleContent && (
              <p className="error">Enter your content.</p>
            )}
          </label>
        </form>
      </main>
    </>
  );
};

export default FormArticle;
