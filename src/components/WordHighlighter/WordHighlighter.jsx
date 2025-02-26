import Highlighter from "react-highlight-words"
import boardRepository from "persistent/persistentKanbanBoardRepository"

const WordHighlighter = ({ text }) => (
  <Highlighter
    highlightClassName="bg-warning"
    searchWords={[boardRepository.getSearchFilter()]}
    autoEscape={true}
    textToHighlight={text}
  />
)

export default WordHighlighter