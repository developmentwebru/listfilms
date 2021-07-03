
import React from "react"

const MovieTabs = props => {

    const handleClick = (value) => {
        return () => {
            updateSortBy(value)
        }
    }

    const getClassByValue = value => {
        return `nav-link ${sort_by === value ? "active" : ""}`
    }

    const { sort_by, updateSortBy } = props;
    return (
        <ul className="tabs nav nav-pills">
            <li className='nav-item'>
                <div
                    onClick={handleClick("popularity.desc")}
                    className={getClassByValue("popularity.desc")}>
                    Popularity desc
                </div>
            </li>
            <li className='nav-item'>
                <div
                    onClick={handleClick("revenue.desc")}
                    className={getClassByValue("revenue.desc")}>
                    Revenue desc
                </div>
            </li>
            <li className='nav-item'>
                <div
                    onClick={handleClick("vote_average.desc")}
                    className={getClassByValue("vote_average.desc")}>
                    Vote avetage desc
                </div>
            </li>

        </ul>
    )
}

export default MovieTabs;