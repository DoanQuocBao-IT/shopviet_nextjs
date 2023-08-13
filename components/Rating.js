import React from 'react'

const Rating = ({value,text,color}) => {
    console.log(value)
  return (
    <div id='rating'>
        <span>
            <i style={{color}} className=
            {value>=1 ? 'pi pi-star-fill': value >=0.5 ? 'pi pi-star':'pi pi-star-fill'}> 
            </i>
        </span>

        <span>
            <i style={{color}} className=
            {value>=2 ? 'pi pi-star-fill': value >=1.5 ? 'pi pi-star':'pi pi-star-fill'}> 
            </i>
        </span>

        <span>
            <i style={{color}} className=
            {value>=3 ? 'pi pi-star-fill': value >=2.5 ? 'pi pi-star':'pi pi-star-fill'}> 
            </i>
        </span>

        <span>
            <i style={{color}} className=
            {value>=4 ? 'pi pi-star-fill': value >=3.5 ? 'pi pi-star':'pi pi-star-fill'}> 
            </i>
        </span>

        <span>
            <i style={{color}} className=
            {value>=5 ? 'pi pi-star-fill': value >=4.5 ? 'pi pi-star':'pi pi-star-fill'}> 
            </i>
        </span>
        <span id='review'>
            {text && text}
        </span>
    </div>
  )
}

Rating.defaultProps={
    color: '#f8e825',
}

export default Rating