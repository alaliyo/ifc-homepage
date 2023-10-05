import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { SizeGet } from "../../../utils/sizeUtils";

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
                    const changeCount = (Math.round(objCount / 1048576 * 100) / 100).toFixed(2) + "GB";
                    const changeObj = { count: changeCount, name: objName };
                    newChangeUnit.push(changeObj);
                } else if (objCount >= 1024) {
                    const changeCount = (Math.round(objCount / 1024 * 100) / 100).toFixed(2) + "MB";
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
                    <h3>{changeUnit[0].name}: {changeUnit[0].count} / 1GB ({((sizeGet[0].count / 1048576) * 100).toFixed(2)+"%"})</h3>
                    <ProgressBar
                        animated
                        variant="danger"
                        now={Number(((sizeGet[0].count / 1048576) * 100).toFixed(2))}
                        label={((sizeGet[0].count / 1048576) * 100).toFixed(2)+"%"}
                    />
                    <hr />
                </div>
            )}

            {sizeGet && changeUnit && (
                <div>
                    <h3>{changeUnit[1].name}: {changeUnit[1].count} / 5GB ({((sizeGet[1].count / (1048576 * 5)) * 100).toFixed(2)+"%"})</h3>
                    <ProgressBar
                        animated
                        variant="danger"
                        now={Number(((sizeGet[1].count / (1048576 * 5)) * 100).toFixed(2))}
                        label={((sizeGet[1].count / (1048576 * 5)) * 100).toFixed(2)+"%"}
                    />
                    <hr />
                </div>
            )}
        </>
    );
}

export default HomeProgressBar;