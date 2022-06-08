import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './imageList.css';

export default function ImagesList({ data }) {
    return (
        <ImageList cols={4} rowHeight={300} variant="quilted">
            {data.length ? data.map((item) => (
                <ImageListItem key={item || item.title} >
                    <img
                        src={`${item}?w=300&h=300&fit=crop&auto=format`}
                        srcSet={`${item}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
                        alt={data}
                        loading="lazy"
                    />
                </ImageListItem>
            )) : null }
        </ImageList>
    );
}
