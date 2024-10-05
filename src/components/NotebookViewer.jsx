{
  /*
    Use Case Example:

    import NotebookViewer from './path/to/NotebookViewer';

    const MyPage = () => {
    return (
        <NotebookViewer
        nbviewerUrl="https://nbviewer.jupyter.org/github/US-GHG-Center/ghgc-docs/blob/staging/user_data_notebooks/casagfed-carbonflux-monthgrid-v3_User_Notebook.ipynb"
        colabUrl="https://colab.research.google.com/github/US-GHG-Center/ghgc-docs/blob/staging/user_data_notebooks/casagfed-carbonflux-monthgrid-v3_User_Notebook.ipynb"
        buttonText="Open in Google Colab"
        />
    );
    };

    export default MyPage;
*/
}

import React from "react";
import { ExternalLink } from "lucide-react";

const NotebookViewer = (
  nbviewerUrl,
  colabUrl,
  iframeWidth = "70%",
  iframeHeight = "700px",
  buttonText = "Edit Notebook in Google Colab"
) => {
  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <div className="space-y-6 w-full flex flex-col items-center justify-center">
        <iframe
          src={nbviewerUrl}
          className={`w-[${iframeWidth}] h-[${iframeHeight}] rounded-lg border-2 border-blue-500 shadow-xl`}
          title="Jupyter Notebook Viewer"
        />
        <a
          href={colabUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2">
            <ExternalLink size={20} />
            <span>{buttonText}</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default NotebookViewer;
