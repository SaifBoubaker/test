import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  getAllPosts,
  toogleDislikePost,
  toogleLikePost,
} from "../redux/slices/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DateFormatter from "../config/DateFormatter";
import { getCategories } from "../redux/slices/category/categorySlice";
import { Link } from "react-router-dom";

function PostList(props) {
  const post = useSelector((state) => state.post);
  const { postList, liked, disliked } = post;

  const category = useSelector((state) => state.category);
  const { categoryList } = category;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts(""));
  }, [dispatch, liked, disliked]);

  useEffect(() => {
    dispatch(getCategories({}));
  }, [dispatch]);

  return (
    <>
      <Grid sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: "50px",
            color: "#e91e63",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          The best place <br /> for your ideas
        </Typography>
      </Grid>
      <Grid sx={{ display: "inline" }}>
        <Grid
          sx={{
            marginTop: "50px",
            marginLeft: "15px",
          }}
        >
          <Typography
            style={{
              textDecoration: "none",
              color: "#e91e63",
              fontWeight: "bold",
            }}
          >
            CATEGORIES
          </Typography>
          <Typography
            onClick={() => {
              dispatch(getAllPosts(""));
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "#651fff",
                fontWeight: "bold",
              }}
            >
              All
            </Link>
          </Typography>
          {categoryList?.map((category) => (
            <Link
              style={{
                textDecoration: "none",
                color: "#651fff",
                fontWeight: "bold",
              }}
            >
              <Typography
                sx={{ width: "10px" }}
                onClick={() => {
                  dispatch(getAllPosts(category?.title));
                }}
              >
                {category?.title}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Grid>
          {postList?.map((post) => (
            <Grid
              key={post.id}
              container
              alignItems="center"
              item
              width={1}
              xs={12}
              md={6}
              sx={{
                margin: "auto",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <CardActionArea>
                <Card sx={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, display: { xs: "none", sm: "block" } }}
                    image={post.image}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {post?.title}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {post?.description}
                    </Typography>
                    <Grid sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "20px",
                        }}
                        image={post?.user?.profilePhoto}
                      />
                      <Typography
                        variant="subtitle1"
                        paragraph
                        sx={{
                          marginLeft: "15px",
                        }}
                      >
                        {`${post?.user?.firstName} ${post?.user?.lastName}`}
                        <Typography>
                          <DateFormatter date={post?.createdAt} />
                        </Typography>
                      </Typography>
                    </Grid>
                    <Link
                      to={`/posts/${post?.id}`}
                      style={{
                        textDecoration: "none",
                        color: "currentColor",
                      }}
                    >
                      <Typography variant="subtitle1" color="primary">
                        Continue reading...
                      </Typography>
                    </Link>

                    <Grid sx={{ marginTop: "15px" }}>
                      <Grid sx={{ display: "flex" }}>
                        <ThumbUpIcon
                          onClick={() => {
                            dispatch(toogleLikePost(post?.id));
                          }}
                          sx={{ paddingLeft: "20px", color: "#1976d2" }}
                        />
                        <Typography sx={{ paddingLeft: 1 }}>
                          {`(${post.likes.length})`}
                        </Typography>
                      </Grid>
                      <Grid sx={{ display: "flex" }}>
                        <ThumbDownIcon
                          onClick={() => {
                            dispatch(toogleDislikePost(post?.id));
                          }}
                          sx={{ paddingLeft: "20px", color: "#1976d2" }}
                        />
                        <Typography sx={{ paddingLeft: 1 }}>
                          {`(${post.dislikes.length})`}
                        </Typography>
                      </Grid>
                      <Grid sx={{ display: "flex" }}>
                        <VisibilityIcon
                          sx={{ paddingLeft: "20px", color: "#1976d2" }}
                        />
                        <Typography sx={{ paddingLeft: 1 }}>
                          {`(${post.numViews})`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default PostList;
