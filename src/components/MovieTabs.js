
import React from "react"

class MovieTabs extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.sort_by !== this.props.sort_by) {
            return true
        } else {
            return false
        }
    }

    render() {

        const handleClick = (value) => {
            return () => {
                updateSortBy(value)
            }
        }

        const getClassByValue = value => {
            return `nav-link ${sort_by === value ? "active" : ""}`
        }

        const { sort_by, updateSortBy } = this.props;
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
}

export default MovieTabs;