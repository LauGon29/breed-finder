import { useState, useEffect, useContext } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchBar from "../components/SearchBar/SearchBar";
import ImagesList from "../components/ImageList/ImageList";
import { CollectionContext } from '../Context/Context';
import Alert from '@mui/material/Alert';

export default function Home() {
    const [collection, setCollection] = useContext(CollectionContext);
    const [showAlert, setShowAlert] = useState({});

    const getAllBreeds = async () => {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        return data.message;
    }

    const [breeds, setBreeds] = useState([]);
    const [breedSelected, setBreedSelected] = useState();
    const [breedImages, setBreedImages] = useState([]);

    const getBreedNames = async () => {
        const list = await getAllBreeds();
        const breedNames = cleanBreedNames(list);
        setBreeds(breedNames);
    };

    const cleanBreedNames = (list) => {
        let breedsList = [];
        for (const key in list) {
            if (typeof Array.isArray(list[key]) && list[key].length) {
                list[key].forEach(subBreed => {
                    breedsList.push(`${key}-${subBreed}`);
                });
            } else {
                breedsList.push(key);
            }
        }
        return breedsList;
    }

    const getBreedImages = async (breed) => {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        setBreedImages(data.message);
    };

    const selectHandler = (breed) => {
        setBreedSelected(breed);
    };

    const addBreedToCollection = () => {
        if (breedSelected.split('-').length > 1) {
            showAlertMessage(`Sub breeds can not be added to favorite collection`, 'error');
        } else {
            if (collection.find(item => item.title === breedSelected)) {
                showAlertMessage(`${breedSelected} is already in your collection`, 'error');
            } else {
                const newFavoriteBreed = {
                    title: breedSelected,
                    img: getRandomImage()
                }
                setCollection([...collection, newFavoriteBreed]);
                showAlertMessage(`${breedSelected} added to collection`, 'success');
            }
        }
    }

    const showAlertMessage = (message, type) => {
        setShowAlert({
            display: true,
            message,
            type
        });
        setTimeout(() => {
            setShowAlert(false, '', '');
        }, 3000);
    }

    const getRandomImage = () => {
        return breedImages[Math.floor(Math.random() * breedImages.length)];
    }
    const getRandomBreed = () => {
        const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
        setBreedSelected(randomBreed);
    }

    useEffect(() => {
        getBreedNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!breedSelected) {
            setBreedSelected(breeds[0]);
        }
    }, [breedSelected, breeds]);

    useEffect(() => {
        if (breedSelected) {
            const breed = breedSelected.replace('-', '/') || breedSelected;
            getBreedImages(breed);
        }
    }, [breedSelected]);


    return (
        <>
            <Stack spacing={2} direction="row">
                <SearchBar list={breeds} selectHandler={selectHandler} randomBreed={breedSelected} />
                <Button variant="contained" size="small" onClick={addBreedToCollection} color="warning" disabled={!breedSelected}>Add Breed To Favorites</Button>
                <Button variant="contained" size="small" onClick={getRandomBreed} color="success">Select Random Breed</Button>
                {showAlert.display ? <Alert severity={showAlert.type}>{showAlert.message}</Alert> : null}
            </Stack>

            {(breedSelected && breedImages.length) ? <ImagesList data={breedImages} /> : null}
        </>
    );
}
