import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Api from "../../Api";
import { customStyles } from "../core/select";

export default function Dropdown(props) {
  const projectId = props?.value;
  const productId = props?.productId;
  const [productData, setProductData] = useState([]);
  const [prefillData, setPrefillData] = useState();
  const history = useHistory();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getTreeProduct();
  }, []);

  const getTreeProduct = () => {
    Api.get(`/api/v1/productTreeStructure/product/list`, {
      params: {
        projectId: projectId,
        userId: userId,
      },
    })
      .then((res) => {
        const treeData = res?.data?.data;
        setProductData(treeData);
        setPrefillData(
          treeData[0]?.productName
            ? { value: treeData[0]?.id, label: `${treeData[0].indexCount} ${treeData[0].productName}` }
            : ""
        );
        // setProductId(treeData[0]?.id);
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
        }
      });
  };

  //logout
  const logout = () => {
    localStorage.clear(history.push("/login"));
    window.location.reload();
  };

  const productTreeData = () => {
    Api.get("/api/v1/productTreeStructure/get/tree/product/list", {
      params: {
        projectId: projectId,
        treeStructureId: productId,
        userId: userId,
      },
    })
      .then((res) => {
        const data = res?.data?.data;
        setPrefillData(data?.productName ? { value: data?.id, label: `${data.indexCount} ${data.productName}` } : "");
      })
      .catch((error) => {
        const errorStatus = error?.response?.status;
        if (errorStatus === 401) {
          logout();
        }
      });
  };
  useEffect(() => {
    if (productId === prefillData?.value) {
    } else {
      productTreeData();
    }
  }, [productId]);

  // const nextProduct = () => {
  //   Api.get("/api/v1/productTreeStructure/get/tree/product/list", {
  //     params: {
  //       projectId: projectId,
  //       treeStructureId: productId,
  //     },
  //   }).then((res) => {
  //
  //   });
  // };

  const getProductId = (e) => {
    history.push({ state: { productId: e.value.id,parentId:e.value.parentId } });
  };

  return (
    <div>
      {/* <div className="d-flex flex-direction-row">
        <div>
          <Button className="FRP-button " variant="secondary">{`${"<< PREV"}`}</Button>
        </div>
        <div>
          {productData?.map((list, i) => {})}
          <Select
            type="select"
            placeholder="Select Product"
            value={prefillData}
            options={[
              {
                options: productData?.map((list, i) => ({
                  value: list.id,
                  label: list.indexCount + ".  " + list.productName,
                })),
              },
            ]}
            onChange={(e) => {
              setPrefillData(e);
              getProductId(e);

              // setProductId(e.id);
            }}
          />
        </div>
        <div>
          <Button
            className="FRP-button"
            variant="secondary"
            onClick={() => {
              setProductIndex(productIndex - 1);
            }}
          >
            {`${"NEXT >>"}`}{" "}
          </Button>
        </div>
      </div> */}
      <Row>
        {/* <Col className="d-flex justify-content-start mt-3" sm={12} md={3}>
          <div>
            <Button
              className="FRP-button "
              variant="secondary"
            >{`${"<< PREV"}`}</Button>
          </div>
        </Col> */}

        <Col className="mt-3 dropdown-Alignments mx-1">
          <div>
            <Select
              styles={customStyles}
              type="select"
              placeholder="Select Product"
              value={prefillData}
              options={[
                {
                  options: productData?.map((list, i) => ({
                    value: list,
                    label: `${list.indexCount} ${list.productName}`,
                    // label: list.indexCount + ".  " + list.productName,
                  })),
                },
              ]}
              onChange={(e) => {
                setPrefillData(e);
                getProductId(e);
                // setPrefillProductData(e);

                // setProductId(e.id);
              }}
            />
          </div>
        </Col>
        {/* <Col className="d-flex justify-content-end mt-3" sm={12} md={3}>
          <div>
            <Button
              className="FRP-button"
              variant="secondary"
              onClick={() => {
                setProductIndex(productIndex - 1);
              }}
            >
              {`${"NEXT >>"}`}{" "}
            </Button>
          </div>
        </Col> */}
      </Row>
    </div>
  );
}
