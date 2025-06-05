import React  from 'react'
import loading from './Loading.gif'

const Spinner = ()=> {
        return (
            <div className="text-center">
                <img className="my-3" src={loading} alt="loading" />
            </div>
        )
}
//This is my API KEY =dd2af8cd3399478baf2e5528600c499a
export default Spinner