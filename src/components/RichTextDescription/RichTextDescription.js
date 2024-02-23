import ReactDOMServer from "react-dom/server"
import parse from "html-react-parser"

import WordHighlighter from "components/WordHighlighter"

const RichTextDescription = ({ description }) => {
  const unescapedMarkup = ReactDOMServer.renderToString(<WordHighlighter text={description} />)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&amp;nbsp;/g, " ")

  return parse(unescapedMarkup)
}

export default RichTextDescription