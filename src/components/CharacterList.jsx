import { useEffect, useState } from 'react';
import Character from './Character';

function NavPage(props) {
    if (props.page > 1) {
        return (
            <header className='d-flex justify-content-between align-items-center'>
                <p>
                    Actual Page: {props.page}
                </p>
                <div>
                    <button className='btn btn-primary btn-sm m-2'
                        onClick={() => props.setPage(props.page - 1)}>
                        Page {props.page - 1}
                    </button>
                    <button className='btn btn-primary btn-sm m-2'
                        onClick={() => props.setPage(props.page + 1)}
                    >
                        Page {props.page + 1}
                    </button>
                </div>

            </header>
        );
    } else {
        return (

            <header className='d-flex justify-content-between align-items-center'>
                <p>
                    Actual Page: {props.page}
                </p>
                <div>
                    <button className='btn btn-primary btn-sm m-2' onClick={() => console.log("Entro")}>
                        Page {props.page}
                    </button>
                    <button className='btn btn-primary btn-sm m-2'
                        onClick={() => props.setPage(props.page + 1)}
                    >
                        Page {props.page + 1}
                    </button>

                </div>

            </header>
        );

    }


}
function CharacterList() {
    const [characters, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        //Realiza la peticion a otro servidor de forma asincronica
        async function fetchData() {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json(); //Convierte la respuesta en un archivo json
            // console.log(data.results);
            setLoading(false);
            setCharacter(data.results);
            // console.log(characters);
        }

        fetchData();
    }, [page]);



    return (

        <div className='container ' >

            <NavPage page={page} setPage={setPage} />

            {loading ? (<h1>Loading..</h1>) : (
                <div className='row'>
                    {
                        characters.map(character => {
                            return (
                                <div className='col-md-4' key={character.id}>
                                    <Character character={character} />
                                </div>

                            )
                        })
                    }
                </div>
            )

            }

            <NavPage page={page} setPage={setPage} />
        </div>

    )
}
export default CharacterList;