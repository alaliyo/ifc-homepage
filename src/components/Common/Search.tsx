import { Button, Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';

interface SearchProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
}

function Search({ searchQuery, setSearchQuery, handleSearch}: SearchProps) {
    // 검색어 상태 갱신
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }; 

    // Enter key를 누르면 검색 실행
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

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
                onClick={handleSearch}
                variant="outline-secondary"
                id="button-addon2"
                size="sm"
            >
                검색
            </Button>
        </InputBox>
    );
}

export default Search;

const InputBox = styled(InputGroup)`
    width: 350px;

    input {
        height: 30px;
    }

    button {
        font-size: 13px;
        font-weight: 900;
        height: 30px;
        padding: 0 10px;

        @media screen and (max-width: 768px) {
            padding: 0 5px;
        }
    }
    
    @media screen and (max-width: 480px) {
        padding-right: 10px;
        width: 70%;
    }
`;