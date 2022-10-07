import { Grid, Typography, Avatar } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteComment } from "../redux/slices/comments/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CommentList({ comments, singlePost }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userAuth } = user;

  return (
    <Grid
      style={{ marginTop: "30px", width: "300px" }}
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      {comments?.map((comment) => (
        <Grid marginBottom="40px">
          <Grid sx={{ display: "flex" }}>
            <Avatar alt="user " src={comment?.user?.profilePhoto} />
            <Typography sx={{ marginLeft: "12px", marginTop: "4px" }}>
              {`${comment?.user?.firstName} ${comment?.user?.lastName}`}
            </Typography>
          </Grid>

          <Typography style={{ marginTop: "7px" }} key={comment?.id} multiline>
            {comment?.description}
          </Typography>
          {userAuth?._id === comment?.user?._id && (
            <Grid sx={{ display: "flex", marginTop: "15px" }}>
              <DeleteIcon
                onClick={() => {
                  dispatch(deleteComment(comment?._id));
                }}
              ></DeleteIcon>
              <Link to={`/update-comment/${comment?._id}`}>
                <EditIcon></EditIcon>
              </Link>
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  );
}

export default CommentList;
