// import React, { useEffect } from 'react'
// import { fetchTestData } from '../features/EwSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import { CustomTestTable } from './Table';

// const TestDemo = () => {
// const dispatch = useDispatch();
// const {testData} = useSelector((state)=>state.ewPolicy)

// useEffect(()=>{
// dispatch(fetchTestData())
// }, [])

// console.log(testData)


// const TABLE_HEAD = [
//     "S.No.",
//     "Name",
//      "Capacity",
//      "Color"
//   ];

//   const TABLE_ROWS = testData?.data?.map((data, index) => ({
//     sno:  data?.id || "NA",
//     name: data?.name || "NA",
//     data: data?.data || "NA",
//   }));


//   return (



//     <div>

//        <p className='font-semibold mt-9 text-center underline'>TABLE</p>
//          <div className=" mt-12 mx-12">
//                     <CustomTestTable
//                       tableHead={TABLE_HEAD}
//                       tableRows={TABLE_ROWS}
                    
//                     />
//                   </div>

//     </div>
//   )
// }

// export default TestDemo