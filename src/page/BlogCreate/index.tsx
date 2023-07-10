import React, { useState , Dispatch, SetStateAction } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { SelectChangeEvent } from '@mui/material/Select'
import Dropzone from 'react-dropzone'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Link,useNavigate  } from 'react-router-dom'
import { Insert ,getAllBlog} from '~/api/blogApi'
import {getAllDep} from '~/api/departmentApi'
import {InsertCompetitionBlog} from '~/api/CompetitionBlog'
import {getAllComp} from '~/api/competitionApi'
import useFetch from '~/hook/useFetch'
import useAuth from '~/hook/useAuth'
interface Competition{
  comId:number,
  comName:string
}
const Index = (): JSX.Element => {
  const { profile } = useAuth()
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const [imageFile, setImageFile] = useState<string | null>();
  const [comId, setComId] = useState<number>(0)
  const [blogId, setBlogId] = useState<number>(0)
  const [blogName, setBlogName] = useState('')
  const [content, setContent] = useState('')
  const [imgName, setImgName] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [errorBlogName,setErrorBlogName] = useState('')
  const [errorBlogDetail,setErrorBlogDetail] = useState('')
  const [errorBlogImg,setErrorBlogImg] = useState('')
  const [open, setOpen] = React.useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [blogInsert, callBlogtInsert] = useFetch()
  const [getComs, callAllComs] = useFetch()
  const [allBlogs, callAllBlog] = useFetch()


  const requestData: {
    blogName: string
    blogDetai: string
    imgName: string
    imgSrc: string
  } = {
    blogName: blogName,
    blogDetai: content,
    imgName: imgName,
    imgSrc: imgSrc
  }


  const handleChange = (event: SelectChangeEvent): void => {
    console.log(parseInt(event.target.value),formattedDate,profile?.userId)
    setComId(parseInt(event.target.value))
  }
  const handleContentChange = (value: any): any => {
    setContent(value)
  }

  const handleImageDrop = (acceptedFiles: any): any => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setSelectedImage(file)
      setImageFile(URL.createObjectURL(file))
      setImgName(file.path)
      setImgSrc(file.path)
    }
  }

  const handleClickOpen = (): void => {
    setOpen(true)
    console.log(blogName, content, imgName, imgSrc)
  }

  const handleClose = (): void => {
    setOpen(false)
  }
  
  const handleOK = async (): Promise<void> => {
    setOpen(false);

    const errorConditions = [
      {
        condition: blogName === '',
        setError: setErrorBlogName,
        errorMessage: 'Chưa có tiêu đề blog'
      },
      {
        condition: content === '',
        setError: setErrorBlogDetail,
        errorMessage: 'Chưa có nội dung cho trang blog'
      },
      {
        condition: imageFile === null || imageFile === undefined,
        setError: setErrorBlogImg,
        errorMessage: 'Chưa có hình ảnh cho trang blog'
      }
    ]

    for (const condition of errorConditions) {
      if (condition.condition) {
        condition.setError(condition.errorMessage)
      }
    }

    const hasError = errorConditions.some((condition) => condition.condition)

    if (hasError) {
      return
    }


    try {
      const blogData = await callBlogtInsert(async () => {
        if (selectedImage) {
          const reader = new FileReader();
          reader.onload = async (): Promise<void> => {
            const imgSrc = reader.result as string;
            await Insert({
              ...requestData,
              imgSrc: imgSrc.split(',')[1],
            });
          };
          reader.readAsDataURL(selectedImage);
        } else {
          return Insert(requestData);
        }
      });
  
      const blogNews = await callAllBlog(getAllBlog)
      const latestBlog = blogNews[blogNews.length - 1];
      const blogId:number = latestBlog?.blogId;
      console.log(blogId)
      if (blogId) {
        await InsertCompetitionBlog({
          comId: comId,
          blogId: blogId,
          userId: profile?.userId,
          postDate: formattedDate
        });
        console.log('Thành công');
      } else {
        console.log('Thất bại');
      }
      // console.log('Thất bại', blogNews,blogNews.length - 1);
    } catch (error) {
      console.log(error);
    }
    navigate('/BlogManage?opensucess=true');
  };
  
  const competitions :Competition[] =
  getComs.payload?.map((com:Competition)=>({
    comId: com.comId,
    comName:com.comName
  })) || []

  React.useEffect(() => {
    const fetchData = async () :Promise<any> => {
      try {
        const data = await getAllComp();
        callAllComs(() => Promise.resolve(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <LayoutAdmin>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Stack
              direction='row'
              spacing={20}
              alignItems='center'
              sx={{ marginTop: '20px' }}
            >
              <Typography
                variant='h4'
                sx={{ fontWeight: 500, color: '#1976d2' }}
              >
                Thêm blog mới
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} alignItems='center' gap={5}>
              <Box
                sx={{
                  display:'flex',
                  flexDirection:"column",
                  gap:"10px",
                  width:"100%",
                  position:"relative"
                }}
              >
                <TextField
                  id='filled-search'
                  label='Tên Blog'
                  type='search'
                  variant='outlined'
                  error={Boolean(errorBlogName)}
                  style={{ width: '100%' }}
                  onChange={(e: any): any => {
                    setBlogName(e.target.value)
                  }}
                />
                {
                  errorBlogName && (
                    <span 
                      style={{
                        fontStyle:"italic",
                        color:"red",
                        position:"absolute",
                        bottom:"-30px"
                      }}
                    >* {errorBlogName}</span>
                  )
                }
              </Box>
              <FormControl
                sx={{ m: 1, minWidth: 80 }}
                style={{ width: '100%' }}
              >
                <InputLabel id='demo-simple-select-autowidth-label'>
                  Cuộc thi
                </InputLabel>
                <Select
                  labelId='demo-simple-select-autowidth-label'
                  id='demo-simple-select-autowidth'
                  value={comId.toString()}
                  onChange={handleChange}
                  label='Age'
                >
                  {
                    competitions.map((row)=>(
                      <MenuItem key={row.comId} value={row.comId}>{row.comName}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <div style={{marginTop:20,position:"relative"}}>
              <Dropzone
                onDrop={handleImageDrop}
                // accept='image/*'
                multiple={false}
              >
                {({ getRootProps, getInputProps }): any => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <span style={{ fontStyle: 'italic' }}>
                      * Lưu ý chỉ chọn được 1 ảnh
                    </span>
                    <p className='layout_drag_image'>
                      <AddRoundedIcon />
                      Kéo thả ảnh, hoặc nhấn để chọn ảnh
                    </p>
                  </div>
                )}
              </Dropzone>
              {imageFile && (
                <div>
                  <h2 className='color-primary'>Ảnh bìa cho trang blog:</h2>
                  <img
                    className='selectedImage'
                    src={imageFile}
                    alt='Selected'
                  />
                </div>
              )}
              {
                errorBlogImg && (
                  <span 
                    style={{
                      fontStyle:"italic",
                      color:"red",
                      position:"absolute",
                      bottom:"-30px"
                    }}
                  >* {errorBlogImg}</span>
                )
              }
            </div>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px' }}>
            <Box
              sx={{
                position:"relative",
                mt:4
              }}
            >
              <ReactQuill
                value={content}
                onChange={handleContentChange}
                modules={modules}
                formats={[
                  'header',
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'list',
                  'bullet',
                  'indent',
                  'link',
                  'image'
                ]}
              />
              {
                errorBlogDetail && (
                  <span 
                    style={{
                      fontStyle:"italic",
                      color:"red",
                      position:"absolute",
                      bottom:"-30px"
                    }}
                  >* {errorBlogDetail}</span>
                )
              }
            </Box>
          </Grid>
          <Grid item md={12}>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              style={{ marginTop: '40px' ,marginBottom:"100px"}}
              onClick={handleClickOpen}
            >
              Thêm blog
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>{'Thông tin '}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Bạn muốn thêm mới trang Blog ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button variant="contained" onClick={handleOK}>
                    OK
                  </Button>
                <Button onClick={handleClose}>Trở về</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </LayoutAdmin>
    </>
  )
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ]
}

export default Index