import { useEffect, useState } from 'react';
import SelectOptions from './components/SelectOptions';
import './App.css';

function App() {
  const [values, setValues] = useState([]);
  const [slugOptions, setSlugOptions] = useState([]);
  const [vbnameOptions, setVbnameOptions] = useState([]);
  const [bnameOptions, setBnameOptions] = useState([]);

  const [selectedSlugOptions, setSelectedSlugOptions] = useState([]);
  const [selectedVbnameOptions, setSelectedVbnameOptions] = useState([]);
  const [selectedBnameOptions, setSelectedBnameOptions] = useState([]);

  const [selectedSlug, setSelectedSlug] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          'https://us-central1-arboreal-vision-339901.cloudfunctions.net/get_filter_values'
        );
        const data = await response.json();

        if (
          selectedSlugOptions.length === 0 ||
          selectedVbnameOptions.length === 0 ||
          selectedBnameOptions.length === 0
        ) {
          setValues(data.data);
        }

        setSlugOptions(
          data.data.map((item) => {
            return { label: item.slug, value: item.slug };
          })
        );
        setVbnameOptions(
          data.data.map((item) => {
            return { label: item.vb_name, value: item.vb_name };
          })
        );
        setBnameOptions(
          data.data.map((item) => {
            return { label: item.b_name, value: item.b_name };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (selectedSlugOptions.length > 0) {
      setSelectedSlug(selectedSlugOptions.map((option) => option.value));
    }
  }, [selectedSlugOptions]);

  useEffect(() => {
    values.length > 0 &&
      values.map((item) => {
        if (selectedSlug.includes(item.slug)) {
          setSelectedOptions([
            ...new Set([
              ...selectedOptions,
              {
                slug: item.slug,
                vb_name: item.vb_name,
                b_name: item.b_name,
              },
            ]),
          ]);
        }
      });
  }, [selectedSlug]);

  console.log('selectedOptions', selectedOptions);
  console.log('selectedSlug', selectedSlug);
  console.log('selectedSlugOptions', selectedSlugOptions);
  return (
    <div className='App'>
      <SelectOptions
        slugOptions={slugOptions}
        vbnameOptions={vbnameOptions}
        bnameOptions={bnameOptions}
        setSelectedSlugOptions={setSelectedSlugOptions}
        setSelectedVbnameOptions={setSelectedVbnameOptions}
        setSelectedBnameOptions={setSelectedBnameOptions}
        setSelectedSlug={setSelectedSlug}
      />
      <table>
        <tr>
          <td>slug</td>
          <td>vb_name</td>
          <td>b_name</td>
        </tr>

        {selectedOptions.length > 0
          ? selectedOptions.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.slug}</td>
                  <td>{value.vb_name}</td>
                  <td>{value.b_name}</td>
                </tr>
              );
            })
          : values.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.slug}</td>
                  <td>{value.vb_name}</td>
                  <td>{value.b_name}</td>
                </tr>
              );
            })}
      </table>
    </div>
  );
}

export default App;
