import { useEffect, useState } from "react";
import { SizeGet } from "../../../utils/sizeUtils";
import styled from "styled-components";
import { ProgressBar } from "react-bootstrap";

interface ObjProps {
    name: string;
    count: string; 
}

function HomeProgressBar() {
    const sizeGet = SizeGet();
    const [changeUnit, setChangeUnit] = useState<Array<ObjProps>>();
    
    useEffect(() => {
        if (sizeGet) {
            const newChangeUnit = [];
            for (const obj of sizeGet) {
                const objCount = obj.count;
                const objName = obj.name;
    
                if (objCount >= 1048576) {
                    const changeCount = (objCount / 1048576).toFixed(3) + "GB";
                    const changeObj = { count: changeCount, name: objName };
                    newChangeUnit.push(changeObj);
                } else if (objCount >= 1024) {
                    const changeCount = (objCount / 1024).toFixed(3) + "MB";
                    const changeObj = { count: changeCount, name: objName };
                    newChangeUnit.push(changeObj);
                } else if (objCount < 1024) {
                    const changeObj = { count: objCount.toString() + "KB", name: objName };
                    newChangeUnit.push(changeObj);
                }
            }
            setChangeUnit(newChangeUnit);
        }
    }, [sizeGet]);
    
    return(
        <>
            {sizeGet && changeUnit && (
                <div>
                    <h3>{changeUnit[0].name}: {changeUnit[0].count} / 1GB</h3>
                    <ProgressBarCustom
                        animated
                        variant="danger"
                        now={sizeGet[0].count/1048576*100}
                    >
                        {(sizeGet[0].count/1048576*100).toFixed(3)+"%"}
                    </ProgressBarCustom>
                    <hr />
                </div>
            )}

            {sizeGet && changeUnit && (
                <div>
                    <h3>{changeUnit[1].name}: {changeUnit[1].count} / 5GB</h3>
                    <ProgressBarCustom
                        animated
                        variant="danger"
                        now={sizeGet[1].count/(1048576*5)*100}
                    >
                        {(sizeGet[1].count/(1048576*5)*100).toFixed(3)+"%"}
                    </ProgressBarCustom>
                    <hr />
                </div>
            )}
        </>
    );
}

export default HomeProgressBar;

const ProgressBarCustom = styled(ProgressBar)`
    font-weight: 900;
    font-size: 15px;
    height: 22px;
    display: flex;
    justify-content: center;
`;