import { useContext } from "react";
import { CollectionContext } from '../Context/Context';
import Button from '@mui/material/Button';

export default function Collection() {
    const [collection, setCollection] = useContext(CollectionContext);
    const removeBreed = (breedName) => {
        const cleanCollection = collection.filter(breed => breed.title !== breedName);
        setCollection(cleanCollection);
    }

    return (
        <>
            <h2>My Favorite Breeds</h2>
            {collection.length
                ? <div className="image-container">
                    {collection.map((item) => {
                        return (
                            <div className="image-item" key={`${item.title}-favorite`}>
                                <div className="image-title-container">
                                    <h2>{item.title}</h2>
                                    <Button variant="contained" size="small" onClick={() => removeBreed(item.title)} color="warning">X</Button>
                                </div>
                                <img
                                    src={`${item.img}?w=300&h=300&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </div>
                        )
                    })}
                </div>
                : <p className="title">Not found favorite breed </p>
            }
        </>
    );
}