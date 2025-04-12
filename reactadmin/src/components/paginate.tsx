import React from 'react';
import { Link } from 'react-router-dom';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination"

interface PaginationLink {
    url: string | null,
    label: string,
    active: boolean
}

interface PaginationProps {
    links: PaginationLink[],
    pageChange: (page: number | null) => void

}

const paginate: React.FC<PaginationProps> = ({ links,pageChange }) => {

    const activeLinkIndex = links.findIndex(link => link.active);

    const filterLinks = links.filter((link, index) => (
        (index !== 0 &&
            index !== links.length - 1) &&
        (index >= activeLinkIndex - 3 &&
            index <= activeLinkIndex + 3)
    ))

    const handlePageChange = (page: number) => {
        pageChange(page);
    }


    return (
        <Pagination>
            <PaginationContent>

                {
                    activeLinkIndex > 1 && (
                        <PaginationItem>
                            <PaginationPrevious href='#' />
                        </PaginationItem>
                    )
                }

                {filterLinks.map((link, index) => (
                    <PaginationItem key={index} className={link.active ? 'bg-red-600 text-white rounded' : undefined}>
                        {
                            link.url ? (
                                <PaginationLink className='hover:bg-red-400' href="#" 
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                onClick={(e:any)=> {
                                    e.preventDefault();
                                    handlePageChange(parseInt(link.label));
                                }}
                                />
                            ) : null
                        }
                    </PaginationItem>
                ))}
                {
                    activeLinkIndex < links.length - 1 && (
                        <PaginationItem>
                            <PaginationNext href='#' />
                        </PaginationItem>
                    )
                }

            </PaginationContent>
        </Pagination>

    )
}


export default paginate;