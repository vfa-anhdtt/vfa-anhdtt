import React from 'react';
import { createRoot } from 'react-dom/client';




// const TextBox = ({ shapeProps, isSelected, onSelect, onChange }) => {
//   const shapeRef = React.useRef();
//   const trRef = React.useRef();

//   React.useEffect(() => {
//     if (isSelected) {
//       // we need to attach transformer manually
//       trRef.current.nodes([shapeRef.current]);
//       trRef.current.getLayer().batchDraw();
//     }
//   }, [isSelected]);

//   return (
//     <React.Fragment>
//       <Text
//         onClick={onSelect}
//         onTap={onSelect}
//         ref={shapeRef}
//         {...shapeProps}
//         draggable
//         onDragEnd={(e) => {
//           onChange({
//             ...shapeProps,
//             x: e.target.x(),
//             y: e.target.y(),
//           });
//         }}
//         onTransformEnd={(e) => {
//           // transformer is changing scale of the node
//           // and NOT its width or height
//           // but in the store we have only width and height
//           // to match the data better we will reset scale on transform end
//           const node = shapeRef.current;
//           const scaleX = node.scaleX();
//           const scaleY = node.scaleY();

//           // we will reset it back
//           node.scaleX(1);
//           node.scaleY(1);
//           onChange({
//             ...shapeProps,
//             x: node.x(),
//             y: node.y(),
//             // set minimal value
//             width: Math.max(5, node.width() * scaleX),
//             height: Math.max(node.height() * scaleY),
//           });
//         }}
//       />
//       {isSelected && (
//         <Transformer
//           ref={trRef}
//           enabledAnchors = {['middle-left', 'middle-right']}
//           boundBoxFunc={(oldBox, newBox) => {
//             // limit resize
//             if (newBox.width < 5 || newBox.height < 5) {
//               return oldBox;
//             }
//             return newBox;
//           }}
//         />
//       )}
//     </React.Fragment>
//   );
// };

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2',
  },
];

const initialText = [
  {
    x: 10,
    y: 10,
    text:"text 1 ne",
    fill: 'red',
    id: 'text1',
  },
  {
    x: 150,
    y: 150,
    text:"text 2 ne",
    fill: 'green',
    id: 'text2',
  },
];

const App = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  // const [text, setText] = React.useState("initialText");
  // const [texts, setTexts] = React.useState(initialText);
  const [selectedId, selectShape] = React.useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
   <div>hello world!!</div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
