import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';

function Search({ handleSearch }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }; 

    // Enter key를 누르면 검색 실행
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch(searchQuery);
        }
    };

    const viewAll = () => {
        handleSearch("");
        setSearchQuery("");
    }

    return(
        <InputBox className="mb-3">
            <Form.Control
                onChange={handleSearchInputChange}
                onKeyDown={handleKeyDown}
                placeholder="검색"
                aria-describedby="basic-addon2"
                value={searchQuery}
            />
            <Button 
                onClick={() => handleSearch(searchQuery)}
                variant="outline-secondary"
                id="button-addon2"
                size="sm"
            >
                검색
            </Button>
            {searchQuery &&
                <Button 
                    onClick={viewAll}
                    variant="outline-secondary"
                    id="button-addon2"
                    size="sm"
                >
                    전체보기
                </Button>
            }
        </InputBox>
    );
}

export default Search;

const InputBox = styled(InputGroup)`
    width: 450px;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 480px) {
        padding-right: 10px;
        width: 90%;
    }

    input {
        @media screen and (max-width: 768px) {
            height: 30px;
        }
    }

    button {
        font-size: 13px;
        font-weight: 900;
        padding: 0 10px;

        @media screen and (max-width: 768px) {
            height: 30px;
            padding: 0 5px;
        }
    }
`;