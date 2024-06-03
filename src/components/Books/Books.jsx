import classes from "./Books.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const Book = ({ book, expanded, onExpandClick }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          className={classes.image}
          component="img"
          image={book.image}
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.primary">
            by {book.authors.join(', ')}
          </Typography>
          <Typography>
            {book.price ? (
              <div>
                <b>{book.price} EUR</b>
              </div>
            ) : (
              <div>
                <b>0 EUR</b>
              </div>
            )}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Published On {book.publishedDate} by {book.publisher}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.flex}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.open(book.buyLink, '_blank');
          }}
        >
          Buy
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.open(book.previewLink, '_blank');
          }}
        >
          Preview
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={onExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{book.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Book;
