import NotebookViewer from "../components/NotebookViewer";

const DataVisualization = () => {
  return (
    <section className="section-wrapper">
      <h1>DataVisualization</h1>
      <NotebookViewer
        nbviewerUrl="https://colab.research.google.com/drive/1oSU4FYdthSOF0Yv5o5A68Kn2rvCktNCK?fbclid=IwY2xjawFunBRleHRuA2FlbQIxMAABHR2zI_ZG2e3D-wqPx6upc0I5VTDQ0UHZQMUX1ypBuWXxGqM3QheocpF54g_aem_mJhI4eqJJQDU0KwKHnZp4g"
        buttonText="Open in Google Colab"
      />
    </section>
  );
};

export default DataVisualization;
