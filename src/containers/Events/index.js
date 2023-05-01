import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

// function fnc () {console.log(data?.events);}

const EventList = () => {
    const { data, error } = useData();
    const [type, setType] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    console.log("before filteredEvents")
    //   : data?.events.filter(event => event.type===type) 

/*     data?.events.filter((evt) => {
        if (evt.type==="conférence") return true;
        return false;
    }); */

    const filteredEvents = (
        (!type
            ? data?.events
            : data?.events.filter((evt) => {
                /* need to filter the array according to the type selected!!! */
                if (evt.type === type) {
                    return true};
                return false;
            })
        ) || []
    ).filter((event, index) => {
        if (
            (currentPage - 1) * PER_PAGE <= index &&
            PER_PAGE * currentPage > index
        ) {
            return true;
        }
        return false;
    });

/*       const filteredEvents = (
        (!type
          ? data?.events
          : data?.events           
          ) || []
      ).filter((event, index) => {
        if (
          (currentPage - 1) * PER_PAGE <= index &&
          PER_PAGE * currentPage > index
        ) {
          return true;
        }
        return false;
      }); */


    const changeType = (evtType) => {
        console.log("evtType: ");
        console.log(evtType);
        setCurrentPage(1);
        setType(evtType);
    };
    const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
    const typeList = new Set(data?.events.map((event) => event.type));
    return (
        <>
            {error && <div>An error occured</div>}
            {data === null ? (
                "loading"
            ) : (
                <>
                    <h3 className="SelectTitle">Catégories</h3>
                    <Select
                        selection={Array.from(typeList)}
                        onChange={(value) => (value ? changeType(value) : changeType(null))}
                    />
                    <div id="events" className="ListContainer">
                        {filteredEvents.map((event) => (
                            <Modal key={event.id} Content={<ModalEvent event={event} />}>
                                
                                {({ setIsOpened }) => (
                                    <EventCard
                                        onClick={() => setIsOpened(true)}
                                        imageSrc={event.cover}
                                        title={event.title}
                                        date={new Date(event.date)}
                                        label={event.type}
                                    />
                                )}
                                
                            </Modal>
                        ))}
                    </div>
                    <div className="Pagination">
                        {[...Array(pageNumber || 0)].map((_, n) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                                {n + 1}
                            </a>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default EventList;
