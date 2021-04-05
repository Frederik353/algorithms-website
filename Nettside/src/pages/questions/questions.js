
import { Footer } from "../../components/footer/footer"
import { NavBar } from "../../components/navbar/navbar"


import "./questions.scss"



import React from "react";
import ReactDOM from "react-dom";

import { data } from "./data-test";










export function Questions(){
    return(
    <div className="wrapper">
        <div className="section-skew questions-navbar">
            <div className="section-content-wrapper">
                <div className="section-content questions-navbar-content">
                    <NavBar />
                </div>
            </div>
        </div>
        <div className="temp flex-column">
            <h1>Questions</h1>
            <Pagination
                data={data}
                limit={5}
                offset={0}
                position="top"
                showInfo={true}
            />



            {/* <div className="questions">
                <div className="question">
                    <div class="info-box">
                        <div class="info">
                            <span>Difficulty:</span>
                            <span class="difficulty easy"></span>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
        <Footer />
    </div>
)};




const QuestionSettings = {
    data: null,
    limit: this.props.limit ? this.props.limit : 6,
    offset: this.props.offset ? this.props.offset : 0,
    pageCount: 0
};





function Pagination(props) {
    const [QuestionSettings, set_QuestionSettings] = useState(QuestionSettings);

    useEffect(() => {
        let data;
        if (this.props.data.isArray) {
            data = this.props.data;
        } else if (typeof this.props.data === "object") {
            data = Object.keys(this.props.data);
        }

        this.setState(prevState => {
            return {
                data,
                pageCount: Math.ceil(data.length / prevState.limit)
            };
        });
    }, [])


    offsetHandler(args) {
        this.setState(prevState => {
            let offset;

            if (args.replace) {
                offset = args.offset;
            } else {
                offset = prevState.offset += args.offset * prevState.limit;
            }

            if (prevState.offset < 0) {
                offset = prevState.limit * prevState.pageCount - prevState.limit;
            }
            if (prevState.offset >= prevState.limit * prevState.pageCount) {
                offset = 0;
            }

            return {
                offset
            };
        });
    }

    let data = this.state.data;

    let limit = this.state.limit;
    let offset = this.state.offset;

    let placeholder = data.filter((key, index) => {
      return index >= offset && index < offset + limit;
    });

    let itemList = placeholder.map(key => {
      return <li key={key}>{this.props.data[key].name}</li>;
    });

    let info = () => {
      if (!this.props.showInfo) return;
      return (
        <div>
          <h4>{this.props.data.length} Items</h4>
          <h4>{this.state.limit} Limit</h4>
          <h4>{this.state.offset} Offset</h4>
        </div>
      );
    };

    let paginationControl = () => {
      return (
        <PaginationControl
          data={this.props.data}
          limit={this.state.limit}
          offset={this.state.offset}
          pageCount={this.state.pageCount}
          nextButton={true}
          prevButton={true}
          offsetHandler={this.offsetHandler.bind(this)}
        />
      );
    };

    let top = () => {
      if (this.props.position === "top" || this.props.position === "top-bottom")
        return paginationControl();
    };

    let bottom = () => {
      if (
        this.props.position === "bottom" ||
        this.props.position === "top-bottom"
      )
        return paginationControl();
    };

    return (
      <div>
        {info()}
        {top()}
        <ul>{itemList}</ul>
        {bottom()}
      </div>
    );
}



















class PaginationControl extends React.PureComponent {
  offsetHandler(args) {
    this.props.offsetHandler(args);
  }

  render() {
    let data;
    if (this.props.data.isArray) {
      data = this.props.data;
    } else if (typeof this.props.data === "object") {
      data = Object.keys(this.props.data);
    }

    let limit = this.props.limit;

    let nav = dir => {
      if (this.props.nextButton)
        return (
          <li
            onClick={this.offsetHandler.bind(this, {
              offset: dir,
              replace: false
            })}
            className="pagination-link"
          >
            <span>{dir > 0 ? "Next" : "Prev"}</span>
          </li>
        );
    };

    let pageCount = this.props.pageCount;
    let linkArray = [];
    let link = 0;
    for (let i = 0; i < pageCount; i++) {
      linkArray.push(link);
      link += limit;
    }
    let links = linkArray.map((item, index) => {
      return (
        <li
          key={item}
          onClick={this.offsetHandler.bind(this, {
            offset: item,
            replace: true
          })}
          className={`${
            item == this.props.offset ? "active" : ""
          }  pagination-link`}
        >
          {index + 1}
        </li>
      );
    });

    return (
      <div>
        <ul className="pagination-links-container">
          {nav(-1)}
          {links}
          {nav(1)}
        </ul>
      </div>
    );
  }
}




































