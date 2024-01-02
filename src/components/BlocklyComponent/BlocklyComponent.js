import React from "react";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { pythonGenerator } from "blockly/python";
import { phpGenerator } from "blockly/php";
import { luaGenerator } from "blockly/lua";
import { dartGenerator } from "blockly/dart";

import locale from "blockly/msg/en";
import "blockly/blocks";

Blockly.setLocale(locale);
Blockly.Css.register([
  // Add your custom styles here
  // injectionDiv is the div after element id: "blocklyDiv"
  `.injectionDiv {
    border-radius: inherit;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .blocklyTreeRow.blocklyTreeRowCategory {
      
    };
    .blocklyTreeRow{
        padding: 12px 10px !important;
    }
    .blocklyToolboxDiv {
      padding: 10px 12px;
      background: transparent;
      border-right: 3px solid var(--cancelColorLight);
    }
    `,
]);

function BlocklyComponent(props) {
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();

  const generateCode = () => {
    var code;
    if (props.proLanguage) {
      switch (props.proLanguage) {
        case "js":
          break;
        case "py":
          code = pythonGenerator.workspaceToCode(primaryWorkspace.current);
          break;
        case "php":
          code = phpGenerator.workspaceToCode(primaryWorkspace.current);
          break;
        case "dart":
          code = dartGenerator.workspaceToCode(primaryWorkspace.current);
          break;
        case "lua":
          code = luaGenerator.workspaceToCode(primaryWorkspace.current);
          break;
        default:
          code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
      }
    } else {
      code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    }
    console.log(code);
    console.log("PROPS IS: ");
    console.log(props);
    console.log(props.onGenerateCode);
    if (props.onGenerateCode) {
      props.onGenerateCode(code);
    }
  };

  useEffect(() => {

    // make sure that workspace is set up well before generate code
    if(primaryWorkspace.current)
      generateCode();
    console.log("Use Effect pro language in blockly component");
  }, [props.proLanguage]);

  //    useEffect(() => {
  //        const { initialXml, children, ...rest } = props;
  //            primaryWorkspace.current = Blockly.inject(
  //                blocklyDiv.current,
  //                {
  //                    toolbox: toolbox.current,
  //                    ...rest
  //                },
  //            );

  //            if (initialXml) {
  //                Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(initialXml), primaryWorkspace.current);
  //            }
  //    }, [primaryWorkspace, toolbox, blocklyDiv, props]);

  useEffect(() => {
    const { initialXml, children, ...rest } = props;

    const createWorkspace = () => {
      const newWorkspace = Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox.current,
        ...rest,
      });

      if (initialXml) {
        Blockly.Xml.domToWorkspace(
          Blockly.utils.xml.textToDom(initialXml),
          newWorkspace
        );
      }

      return newWorkspace;
    };

    primaryWorkspace.current = createWorkspace();

    return () => {
      // Cleanup Blockly instance if necessary
      if (primaryWorkspace.current) {
        primaryWorkspace.current.dispose();
      }
    };
  }, [blocklyDiv, toolbox, primaryWorkspace]);
  // if add props into dependency array above, this blockly workspace is cleanup and re-render every time parent component change any state

  return (
    <React.Fragment>
      <div style={{ height: "100%", width: "100%", position: "relative" }}>
        <button
          className="btn"
          onClick={generateCode}
          style={{
            position: "absolute",
            top: "3px",
            right: "15px",
            zIndex: "2",
          }}
        >
          <FontAwesomeIcon icon={faPlay} size={"xl"}></FontAwesomeIcon>
        </button>
        <div
          ref={blocklyDiv}
          id="blocklyDiv"
          style={{ height: "100%", width: "100%", borderRadius: "20px" }}
        />
        <div style={{ display: "none" }} ref={toolbox}>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default BlocklyComponent;
