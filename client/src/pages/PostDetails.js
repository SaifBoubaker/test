import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getsinglePost } from "../redux/slices/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { CardMedia, Grid } from "@mui/material";
import { toast } from "react-toastify";
import AddComment from "../components/AddComment";
import CommentList from "../components/CommentList";
export default function PostDetails() {
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  const { userAuth } = user;
  const { singlePost } = post;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useSelector((state) => state.comment);
  const { commentCreated, deletedComment } = comment;
  useEffect(() => {
    dispatch(getsinglePost(id));
  }, [dispatch, id, commentCreated, deletedComment]);
  return (
    <main>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "20px", backgroundSize: "cover" }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "500px",
            height: "400px",
            display: { xs: "none", sm: "block" },
          }}
          image={singlePost?.image}
        />
      </Grid>

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {singlePost?.title}
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            {singlePost?.description}
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            {userAuth?._id === singlePost?.user?.id && (
              <>
                <Link
                  to={`/update-post/${id}`}
                  style={{ textDecoration: "none", color: "currentColor" }}
                >
                  <Button variant="contained">Update</Button>
                </Link>
                <Button
                  variant="outlined"
                  onClick={() => {
                    dispatch(deletePost({ id, toast, navigate }));
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </Stack>
        </Container>
        <AddComment postId={id}></AddComment>
      </Box>
      <Container>
        <CommentList
          comments={singlePost?.comments}
          singlePost={singlePost}
        ></CommentList>
      </Container>
    </main>
  );
}
