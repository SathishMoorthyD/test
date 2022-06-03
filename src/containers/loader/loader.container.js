import * as React from 'react';
import { CircularProgress } from '@mui/material';
import '../../App.css';
import { Backdrop, NoSsr } from '@mui/material';
export function Loader  (isOpen)  {
   
  return (
    <NoSsr>
        <div>
            <Backdrop
            className='loader-backdrop' open={isOpen}>
 <CircularProgress  color='inherit'></CircularProgress >
            </Backdrop>
        </div>
    </NoSsr>
  )
}
