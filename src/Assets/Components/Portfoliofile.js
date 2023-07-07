import React from "react";
import "../Css/Portfoliofile.css";
import { Image } from "react-bootstrap";
const Portfoliofile = (prop) => {
    return (
        <div>
            <div className="portimage">
                <Image src={prop.image} width="100%" />
            </div>
            <div className="portdata">
                <div>
                    <p className="assetnamrport">{prop.name}</p>
                    <p className="featureport">{prop.feature}</p>
                </div>
                <hr className="dividerport"></hr>
                <div className="valuemakeinrowflex">
                    <div>
                        <p className="portpricehead"> {prop.pricehead}</p>
                        <p className="portprice">{prop.price}</p>
                    </div>
                    <div>
                        <p className="portvaluhead">{prop.valuehead}</p>
                        <p className="portvalueactual">{prop.value}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfoliofile;
