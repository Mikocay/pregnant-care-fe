import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 20px 0;
`

export const EditorContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  width: 100%; /* Make width responsive */
  overflow-y: auto; /* Add scroll if content exceeds the height */
`

export const MenuContainer = styled.div`
  width: 100%; /* Make width responsive */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`