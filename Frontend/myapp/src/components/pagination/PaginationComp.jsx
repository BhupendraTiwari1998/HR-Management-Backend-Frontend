import React from 'react'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComp = () => {

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div>

            <Stack spacing={2}>
                <Typography>Page: {page}</Typography>
                <Pagination count={10} page={page} onChange={handleChange} />
            </Stack>

        </div>
    )
}

export default PaginationComp